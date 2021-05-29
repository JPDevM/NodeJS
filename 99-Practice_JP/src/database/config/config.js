// .env
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER, // MySQL server user (by default it is root)
    password: process.env.DB_PASS, // MySQL server password (by default it is empty)
    database: 'subs_db', // Name of the DB to connect.
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
