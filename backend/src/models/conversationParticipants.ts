import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type ConversationParticipantType = {
  id: number;
  conversation_id: number;
  participant_id: number[];
  created_at?: Date;
};

class ConversationParticipant {
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
  async createConversationParticipant(
    connection: PoolClient,
    c: ConversationParticipantType
  ): Promise<ConversationParticipantType> {
    try {
      const query = {
        text: 'INSERT INTO conversation_participants (conversation_id, participant_id) VALUES ($1, $2) RETURNING *',
        values: [c.conversation_id, c.participant_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default ConversationParticipant;
