import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { hash } from '../utils/password';

export type UserType = {
  id: string;
  name: string;
  phone_number: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
};
class User {
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
  async createUser(u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const password = await hash(u.password);
        const query = {
          text: `
            INSERT INTO users (name, phone_number, password)
            VALUES ($1, $2, $3)
            RETURNING id, phone_number
          `,
          values: [u.name, u.phone_number, password]
        };
        const result = await connection.query(query);
        const { id: user_id } = result.rows[0];
        const infoQuery = {
          text: 'INSERT INTO abouts (user_id) VALUES ($1)',
          values: [user_id]
        };
        await connection.query(infoQuery);
        return result.rows[0];
      });
    });
  }
  async getUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT id, name, phone_number FROM users WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          UPDATE users SET name=$2, updated_at=CURRENT_TIMESTAMP
          WHERE id=$1
          RETURNING id, name
        `,
        values: [id, u.name]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async changeNumber(id: string, u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          UPDATE users SET phone_number=$2, updated_at=CURRENT_TIMESTAMP
          WHERE id=$1
          RETURNING id, phone_number
        `,
        values: [id, u.phone_number]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }

  async deleteUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE users SET updated_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default User;
