const { resolve} = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: resolve(__dirname, '..','..', '.env'),
});

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    poll: {
      min: 2,
      max:10,
    },
    migrations: {
      tableName: 'Knex_migrations',
      directory: resolve(__dirname, 'migrations'),
    },
  },
  production: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    poll: {
      min: 2,
      max:10,
    },
    migrations: {
      tableName: 'Knex_migrations',
      directory: resolve(__dirname, 'migrations'),
    },
  },
};