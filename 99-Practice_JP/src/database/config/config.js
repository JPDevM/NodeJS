module.exports = {
  development: {
    username: 'root', // MySQL server user (by default it is root)
    password: null, // MySQL server password (by default it is empty)
    database: 'subs_db', // Name of the DB to connect.
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
