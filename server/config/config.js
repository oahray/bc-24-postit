require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postit-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postit-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  e2e: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postit-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.REMOTE_DB_USER,
    password: process.env.REMOTE_DB_PASS,
    database: process.env.REMOTE_DB,
    host: process.env.REMOTE_DB_HOST,
    port: 5432,
    dialect: 'postgres'
  }
};
