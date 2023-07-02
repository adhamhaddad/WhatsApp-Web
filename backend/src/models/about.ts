import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type AboutType = {
  id: number;
  about: string;
  user_id: number;
};

class About {
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
  
  async getAbout(id: string): Promise<AboutType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM abouts WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  
  async updateAbout(id: string, i: AboutType): Promise<AboutType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE abouts SET about=$2 WHERE id=$1 RETURNING *',
        values: [id, i.about]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default About;
