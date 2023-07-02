import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type GroupMemberType = {
  id: number;
  group_id: number;
  user_id: number;
  user_role: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

class GroupMember {
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
  async createGroupMember(g: GroupMemberType): Promise<GroupMemberType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2) RETURNING *',
        values: [g.group_id, g.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getGroupMembers(id: string): Promise<GroupMemberType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM group_members WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateGroupMember(id: string, g: GroupMemberType): Promise<GroupMemberType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE group_members SET user_role=$2 WHERE id=$1',
        values: [id, g.user_role]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteGroupMember(id: string): Promise<GroupMemberType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM group_members WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default GroupMember;
