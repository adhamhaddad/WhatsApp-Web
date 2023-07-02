import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type ProfilePictureType = {
  id?: number;
  user_id: number;
  image_url: string;
  created_at?: Date;
};

class ProfilePicture {
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
  async createProfilePicture(
    c: ProfilePictureType
  ): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO profile_pictures (image_url, user_id) VALUES ($1, $2) RETURNING *',
        values: [c.image_url, c.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateProfilePicture(
    id: string,
    image_url: string
  ): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE profile_pictures SET image_url=$2 WHERE id=$1 RETURNING *',
        values: [id, image_url]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getProfilePicture(id: string): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM profile_pictures WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return { id: null, image_url: null };
      }
    });
  }
  async deleteProfilePicture(id: string): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM profile_pictures WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default ProfilePicture;
