import dotenv from 'dotenv';

dotenv.config();

const database =
  process.env.NODE_ENV === 'dev'
    ? process.env.POSTGRES_DB
    : process.env.POSTGRES_DB_TEST;

const configs = {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  db_host: process.env.POSTGRES_URI,
  db_port: Number(process.env.POSTGRES_PORT),
  db_name: database,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  redis_uri: process.env.REDIS_URI,
  redis_host: process.env.REDIS_HOST,
  redis_port: Number(process.env.REDIS_PORT),
  redis_user: process.env.REDIS_USER,
  redis_password: process.env.REDIS_PASSWORD,
  salt: Number(process.env.SALT_ROUNDS),
  pepper: process.env.SECRET_PEPPER,
  access_token: process.env.JWT_SECRET_ACCESS_TOKEN,
  refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
  access_expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION),
  refresh_expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
  backend_host: process.env.BACKEND_HOST,
  frontend_host: process.env.FRONTEND_HOST
};
export default configs;
