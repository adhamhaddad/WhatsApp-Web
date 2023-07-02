import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { MessageType, AttachmentType } from './message';
import ConversationParticipant, {
  ConversationParticipantType
} from './conversationParticipants';
import Chat, { ChatType } from './chat';

export type ConversationType = {
  id: number;
  user_id: number;
  conversation_id: number;
  created_at: Date;
  deleted_at: Date;
};

type ConversationTypes = ConversationType &
  MessageType &
  AttachmentType &
  ConversationParticipantType &
  ChatType;
class Conversation {
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
  async createConversation(connection: PoolClient): Promise<ConversationType> {
    const query = {
      text: 'INSERT INTO conversations DEFAULT VALUES RETURNING *'
    };
    const result = await connection.query(query);
    return result.rows[0];
  }

  async deleteConversation(c: ConversationType): Promise<ConversationType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO deleted_conversations (conversation_id, user_id) VALUES ($1, $2) RETURNING *',
        values: [c.conversation_id, c.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Conversation;
