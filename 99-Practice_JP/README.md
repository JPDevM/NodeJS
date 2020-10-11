# To-do

- [x] Folder structure for a Node.js project.
      ├─ node_modules/
      ├─ public/
      │ ├─ css/
      │ ├─ images/
      │ └─ js/
      └─ src/
      ├─ controllers/
      ├─ middlewares/
      ├─ routers/
      └─ view/
      app.js
      package.json
      README
      LICENCE, gitignore, etc ...
- [x] README.md, LICENCE & .gitignore
- [x] Install Node.JS, NPM & Express
- [x] Definition of MVC entities: users, subscriptions.
      ```js
      app.get('/', function (request, response) {
      response.send('Server ok');
      });

      app.get('/subscriptions', function (request, response) {
        response.send('subscriptions ok');
      });

      app.get('/users', function (request, response) {
        response.send('users ok');
      });

      // 404 Not Found
      app.get('*', function (request, response) {
        response.send('404 - Not found');
      });
      ```
      Test:
      http://localhost:5000/ --> ok
      http://localhost:5000/subscriptions --> ok
      http://localhost:5000/users --> ok
      http://localhost:5000/sdfg --> ok

- [x] MVC: Create Routes files (entities) --> staticRouter.js, usersRouter.js, subscriptionRoutes.

  > Create the ROUTERS. https://expressjs.com/es/guide/routing.html
  > Modularize; static Router, products Router, subscription Routes.
  > A ROUTER is an "entity". BREAD: Browse, Read, Edit, Add, Delete.

  ```js
  const staticRouter = require('./src/routes/staticRouter');
  app.use('/', staticRouter);

  const subscriptionRouter = require('./src/routes/subscriptionRouter');
  app.use('/subscriptions', subscriptionRouter);

  const usersRouter = require('./src/routes/usersRouter');
  app.use('/users', usersRouter);

  // 404 Not Found
  app.get('*', function (request, response) {
    response.send('404 - Not found');
  });
  ```

- [x] MVC: Create Controllers files (entities) --> staticController.js, usersController.js, subscriptionControllers.js
- [ ] MVC: Create Views files (entities) --> staticRouter.js, usersRouter.js, subscriptionRoutes.
- [ ]

```

```
