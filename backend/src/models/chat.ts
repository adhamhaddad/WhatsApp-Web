import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { MessageType, AttachmentType } from './message';
import Conversation, { ConversationType } from './conversation';
import { ConversationParticipantType } from './conversationParticipants';
import { ProfilePictureType } from './profilePictures';

export type ChatType = {
  id?: number;
  user_id: number;
  conversation_participants_id?: number[];
  last_message: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
type ChatTypes = ConversationType &
  MessageType &
  AttachmentType &
  ConversationParticipantType &
  ChatType;

type GetChatType = ChatType & ProfilePictureType;
class Chat {
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
  async createChat(
    c: ChatTypes & { images?: [{ img_url: string }] } & {
      files?: [{ file_url: string }];
    }
  ): Promise<ChatType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        console.log(c);
        // INSERT Conversation
        const conversation = new Conversation();
        const { id: conversation_id } = await conversation.createConversation(
          connection
        );

        // INSERT Message
        const createMessageQuery = {
          text: 'INSERT INTO messages (conversation_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
          values: [conversation_id, c.user_id, c.message]
        };
        const messageResult = await connection.query(createMessageQuery);
        const { id: message_id } = messageResult.rows[0];
        const { images } = c;

        if (images) {
          for (const img of images) {
            const query = {
              text: 'INSERT INTO attachments (message_id, image_url) VALUES ($1, $2) RETURNING *',
              values: [message_id, img.img_url]
            };
            await connection.query(query);
          }
        }
        const { files } = c;
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
        await connection.query(attachmentsQuery);

        // INSERT conversation_participants
        const participantResults = [];
        for (const participant_id of c.participant_id) {
          const query = {
            text: 'INSERT INTO conversation_participants (conversation_id, participant_id) VALUES ($1, $2) RETURNING *',
            values: [conversation_id, participant_id]
          };
          const result = await connection.query(query);
          participantResults.push(result.rows[0]);
        }

        // INSERT Chats
        const chatObject = {
          user_id: c.user_id,
          conversation_participants_id: participantResults,
          last_message: c.message
        };

        const chatResult = [];

        for (const participant_id of chatObject.conversation_participants_id) {
          const query = {
            text: 'INSERT INTO chats (user_id, conversation_participants_id, last_message) VALUES ($1, $2, $3) RETURNING *',
            values: [
              participant_id.participant_id,
              participant_id.id,
              c.message
            ]
          };
          const result = await connection.query(query);
          chatResult.push(result.rows[0]);
        }
        return chatResult;
      });
    });
  }
  async getChats(user_id: string): Promise<GetChatType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT
          c.id,
          cp2.participant_id AS user_id,
          pp.image_url,
          u.name,
          c.last_message,
          c.created_at,
          cp.conversation_id
        FROM chats c
        INNER JOIN conversation_participants cp ON cp.id = c.conversation_participants_id
        INNER JOIN conversation_participants cp2 ON cp2.conversation_id = cp.conversation_id
        LEFT JOIN profile_pictures pp ON pp.user_id = cp2.participant_id
        LEFT JOIN users u ON u.id = cp2.participant_id
        WHERE cp.participant_id = $1 AND cp2.participant_id != $1
        `,
        values: [user_id]
      };
      const result = await connection.query(query);
      if (result.rows.length) {
        return result.rows.map((chat) => ({
          id: chat.id,
          user_id: chat.user_id,
          image_url: chat.image_url,
          name: chat.name,
          conversation_id: chat.conversation_id,
          last_message: chat.last_message,
          created_at: chat.created_at
        }));
      }
      return [];
    });
  }
  async getChat(id: string): Promise<ChatType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT
          c.id AS chat_id,
          cp.participant_id AS user_id,
          cp.conversation_id
        FROM conversation_participants cp
        INNER JOIN chats c ON c.conversation_participants_id = cp.id
        WHERE c.id IN (7, (
          SELECT id
          FROM chats
          WHERE conversation_participants_id IN (
            SELECT id
            FROM conversation_participants
            WHERE conversation_id = (
              SELECT conversation_id
              FROM chats
              WHERE id = 7
            ) AND participant_id != 1
          )
        )) AND cp.participant_id IN (1, (
          SELECT participant_id
          FROM conversation_participants
          WHERE conversation_id = (
            SELECT conversation_id
            FROM chats
            WHERE id = 7
          ) AND participant_id != 1
        ))
        `,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateChat(connection: PoolClient, id: string): Promise<ChatType> {
    const query = {
      text: 'UPDATE chats SET last_message=$2 WHERE id=$1 RETURNING *',
      values: [id]
    };
    const result = await connection.query(query);
    return result.rows[0];
  }
}
export default Chat;
