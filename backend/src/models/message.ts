import { PoolClient } from 'pg';
import { pgClient } from '../database';

export interface MessageType {
  id: number;
  conversation_id: number;
  user_id: number;
  message: string;
  is_seen: boolean;
  created_at: Date;
  updated_at: Date;
  attachments: AttachmentType[];
}

export interface AttachmentType {
  file_url?: string;
  image_url?: string;
}
class Message {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  async createMessage(
    m: MessageType & { images?: [{ img_url: string }] } & {
      files?: [{ file_url: string }];
    }
  ): Promise<MessageType> {
    console.log(m);
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: 'INSERT INTO messages (conversation_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
          values: [m.conversation_id, m.user_id, m.message]
        };
        const result = await connection.query(query);
        const { id: message_id } = result.rows[0];
        const { images } = m;

        if (images) {
          for (const img of images) {
            const query = {
              text: 'INSERT INTO attachments (message_id, image_url) VALUES ($1, $2) RETURNING *',
              values: [message_id, img.img_url]
            };
            await connection.query(query);
          }
        }

        const { files } = m;
        if (files) {
          for (const file of files) {
            const query = {
              text: 'INSERT INTO attachments (message_id, file_url) VALUES ($1, $2) RETURNING *',
              values: [message_id, file.file_url]
            };
            await connection.query(query);
          }
        }
        const attachmentsQuery = {
          text: 'SELECT * FROM attachments WHERE message_id=$1',
          values: [message_id]
        };
        const attachmentsResult = await connection.query(attachmentsQuery);
        return { ...result.rows[0], attachment: [...attachmentsResult.rows] };
      });
    });
  }
  async getMessages(
    conversation_id: string,
    user_id: number
  ): Promise<MessageType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `SELECT m.*, a.image_url, a.file_url
          FROM messages m
          LEFT JOIN attachments a ON m.id = a.message_id
          LEFT JOIN deleted_messages dm ON m.id = dm.message_id AND dm.user_id = $1
          WHERE m.conversation_id = $2 AND dm.id IS NULL
          ORDER BY m.created_at
          `,
        values: [user_id, conversation_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateMessage(id: string, m: MessageType): Promise<MessageType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE messages SET message=$2, update_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *',
        values: [id, m.message]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteMessage(id: string): Promise<MessageType> {
    return this.withConnection(async (connection: PoolClient) => {
      // INSERT INTO delete_messages
      const query = {
        text: 'UPDATE messages SET update_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Message;
