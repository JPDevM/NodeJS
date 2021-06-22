This file is a section of [Workflow to create backend with NodeJS](./README.md).

### Workflow to configure Dotenv in NodeJS.

> Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

##### Create the environment variables

> [dotenv documentation](https://www.npmjs.com/package/dotenv)

In main file. e.i.: <u>app.js</u> 

```js 
require('dotenv').config();
```

Create the environment variables file and its documentation file in the root directory.

In environment variables file. e.i.: <u>.env</u>

```
USER_NAME = Juan Pablo
DB_NAME = subs_db
DB_USER = root
DB_PASS = root
APP_HOST = localhost
APP_PORT = 5000
```

##### Keep record the documentation of environment variables. 

e.i.: <u>.env.example</u>

##### Specify express.js to listen for the port of host variables.

> `process.env` now has the keys and values you defined in your `.env` file.

In main file. e.i.: <u>app.js</u>

```js
// Welcome menssaje
console.info(
  `Hi ${process.env.USER_NAME}, have a nice day! the server is now live in http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
);
```

##### Assign environment variables to the db.
> In this case in sequelize.

In the database configuration file. e.i.: <u>config.js</u>

```js
// .env
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER, // MySQL server user (by default it is root)
    password: process.env.DB_PASS, // MySQL server password (by default it is empty)
    database: process.env.DB_NAME, // Name of the DB to connect.
    host: '127.0.0.1',
    dialect: 'mysql',
  },
```





<!-- No olvidar, agregar.env a gitigore -->