import dotenv from 'dotenv';

const result = dotenv.config();

if (result?.error) {
  throw new Error('Add .env file');
}

export const config = {
  env: process.env.IZ_ENV,
  appName: process.env.IZ_APP,
  port: process.env.IZ_PORT,
  version: process.env.IZ_VERSION,
  dbUser: process.env.IZ_DB_USER,
  dbPass: process.env.IZ_DB_PASS,
  dbName: process.env.IZ_DB_NAME,
  dbHost: process.env.IZ_DB_HOST,
  dbPort: process.env.IZ_DB_PORT,
  dbUri: `postgres://${process.env.IZ_DB_USER}:${process.env.IZ_DB_PASS}@${process.env.IZ_DB_HOST}:${process.env.IZ_DB_PORT}/${process.env.IZ_DB_NAME}`,
};
