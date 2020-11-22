### Dotenv.

##### dotenv: Create the environment variables

> (dotenv documentation)[https://www.npmjs.com/package/dotenv]

In main file. e.i.: <u>app.js</u> `require('dotenv').config();`

Create the environment variables file and its documentation file in the root directory.

In environment variables file. e.i.: <u>.env</u>

```
DB_HOST = localhost
DB_NAME = Juan Pablo
DB_USER = root
DB_PASS = root
DB_PORT = 5000
```

Keep record the documentation of environment variables. e.i.: <u>.env.example</u>

Specify express.js to listen for the port of host variables.

In main file. e.i.: <u>app.js</u>

```js
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
app.listen(port, () => console.log(`Server on http://${host}:${port}/`));
```

## 