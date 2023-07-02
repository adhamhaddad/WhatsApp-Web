import { PoolClient } from 'pg';
import { pgClient } from '../database';

type BlockedContactType = {
  id: number;
  user_id: number;
  contact_id: number;
  created_at: Date;
};

class BlockedContact {
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
  async createBlockContact(c: BlockedContactType): Promise<BlockedContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO blocked_contacts (user_id, contact_id) VALUES ($1, $2) RETURNING *',
        values: [c.user_id, c.contact_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getBlockContacts(user_id: string): Promise<BlockedContactType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM blocked_contacts WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async deleteBlockContact(id: string): Promise<BlockedContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM blocked_contacts WHERE id=$1 RETURNING *',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default BlockedContact;
