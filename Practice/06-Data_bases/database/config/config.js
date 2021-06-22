module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "movies_db_2020",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      underscored: true, // esto aplica para TODOS los modelos
      paranoid: true // esto es para el soft delete de TODOS los modelos
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
