import { PoolClient } from 'pg';
import { pgClient } from '../database';

type ContactType = {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
};

class Contact {
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
  async createContact(c: ContactType): Promise<ContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO contacts (user_id, first_name, last_name, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [c.user_id, c.first_name, c.last_name, c.phone_number]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getContact(id: string): Promise<ContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT c.first_name, c.last_name, c.phone_number, u.id, COALESCE(pp.image_url, null) AS image_url, a.about
        FROM contacts c
        INNER JOIN users u ON c.phone_number = u.phone_number
        LEFT JOIN (
            SELECT DISTINCT ON (user_id) *
            FROM profile_pictures
            ORDER BY user_id, created_at DESC
        ) AS pp ON pp.user_id = u.id
        LEFT JOIN abouts a ON a.user_id = u.id
        WHERE c.id = $1
        `,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  /*
  SELECT ALL
  `SELECT c.*, pp.img_url, i.about
        FROM contacts c
        LEFT JOIN users u ON c.phone_number = u.phone_number
        LEFT JOIN (
            SELECT DISTINCT ON (user_id) *
            FROM profile_pictures
            ORDER BY user_id, created_at DESC
        ) AS pp ON pp.user_id = u.id
        LEFT JOIN information i ON i.user_id = u.id
        WHERE c.user_id = $1
        `
  */
  async getContacts(user_id: string): Promise<ContactType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT c.*, u.id AS contact_user_id, COALESCE(pp.image_url, null) AS image_url, u.name, a.about
        FROM contacts c
        INNER JOIN users u ON c.phone_number = u.phone_number
        LEFT JOIN (
            SELECT DISTINCT ON (user_id) *
            FROM profile_pictures
            ORDER BY user_id, created_at DESC
        ) AS pp ON pp.user_id = u.id
        LEFT JOIN abouts a ON a.user_id = u.id
        WHERE c.user_id = $1
        `,
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateContact(id: string, c: ContactType): Promise<ContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE contacts SET phone_number=$2, updated_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *',
        values: [id, c.phone_number]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteContact(id: string): Promise<ContactType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM contacts WHERE id=$1 RETURNING *',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Contact;
