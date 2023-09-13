import dotenv from "dotenv";
dotenv.config();

import {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOSTNAME
} from "./db.config.js";
const env = process.env.NODE_ENV || 'development';
const dialect = process.env.DATABASE_DIALECT;

const config = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: process.env.DATABASE_DEVELOPMENT_NAME,
    host: DATABASE_HOSTNAME,
    dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: DATABASE_HOSTNAME,
    dialect,
  },
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: process.env.DATABASE_PRODUCTION_NAME,
    host: DATABASE_HOSTNAME,
    dialect,
  },
};

export default config[env];