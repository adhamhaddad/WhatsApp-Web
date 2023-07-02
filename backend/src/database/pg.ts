import { Pool, PoolClient } from 'pg';
import configs from '../configs';

const pool = new Pool({
  host: configs.db_host,
  port: configs.db_port,
  database: configs.db_name,
  user: configs.db_user,
  password: configs.db_password
});

pool.on('connect', () => {
  console.log('Connected to Postgres.');
});

pool.on('error', (error) => {
  console.error('Error connecting to Postgres:', error);
});

export default {
  connect: async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
  }
};
