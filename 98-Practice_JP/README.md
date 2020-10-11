# To-do

- [x] Folder structure for a Node.js project.
      <img src="/Users/jp/Documents/JPDevM/Dev/JPDevM CV on GitHub/node_practice/98-Practice_JP/public/images/docs/Folder-structure.png" alt="Folder-structure" style="zoom:50%;" />
- [x] README.md, LICENCE & .gitignore.

- [x] Install Node.JS, NPM & Express.

- [x] Definition of MVC entities.

  > Subscriptions, Promotions, Users.

- [x] MVC: Create Routes

  > Documentation: https://expressjs.com/es/guide/routing.html

  app.js

  ```js
  app.get('/', function (request, response) {
    response.send('The Server page works ok');
  });

  app.get('/subscriptions', function (request, response) {
    response.send('The Subscriptions page works ok');
  });

  app.get('/promotions', function (request, response) {
    response.send('The Promotions page works ok');
  });

  app.get('/users', function (request, response) {
    response.send('The Users page works ok');
  });

  // 404 Not Found
  app.get('*', function (request, response) {
    response.send('404 - Not found');
  });
  ```

  <u>Test:</u>
  http://localhost:5000/ --> ok
  http://localhost:5000/subscriptions --> ok
  http://localhost:5000/users --> ok
  http://localhost:5000/sdfg --> ok

- [x] MVC: Modularize and create routes files (entities).

  > Static, Subscription, Promotions.
  > A ROUTER is an "entity". BREAD: Browse, Read, Edit, Add, Delete.

    <img src="/Users/jp/Documents/JPDevM/Dev/JPDevM CV on GitHub/node_practice/98-Practice_JP/public/images/docs/Routes-files.png" alt="Routes-files" style="zoom:50%;" />

  App.js

  ```js
  const staticRouter = require('./src/routes/staticRouter');
  app.use('/', staticRouter);

  const subscriptionsRouter = require('./src/routes/subscriptionsRouter');
  app.use('/subscriptions', subscriptionsRouter);

  const promotionsRouter = require('./routes/promotionsRouter');
  app.use('/promotions', promotionsRouter);

  const usersRouter = require('./src/routes/usersRouter');
  app.use('/users', usersRouter);

  // 404 Not Found
  app.get('*', function (request, response) {
    response.send('404 - Not found');
  });
  ```

  subscriptionsRouter.js (idem with staticRouter.js, promotionsRouter.js, usersRouter.js)

  ```js
  const express = require('express');
  const router = express.Router();

  // Routing to http://localhost:5000/subscriptions
  router.get('/', function (request, response) {
    response.send('The Subscriptions page works ok');
  });

  module.exports = router;
  ```

- [x] MVC: BREAD Subscriptions entity. 7 routes.

  > 1 BROWSE - See all
  > 3 EDIT - Edit one (edit form)
  > 4 EDIT - Edit one
  > 5 ADD - Add one (creation form)
  > 6 ADD - Add one
  > 7 DELETE - Delete one
  > 2 READ - See one

  subscriptionsRouter.js (idem with staticRouter.js, promotionsRouter.js, usersRouter.js)

  ```js
  router.get('/', function (request, response) {
    response.send('The Subscriptions See All page works ok');
  });

  router.get('/:id/edit', function (request, response) {
    response.send('The Subscriptions Edit Form page works ok');
  });

  router.put('/:id', function (request, response) {
    response.send('The Subscriptions Edit One page works ok');
  });

  router.get('/create', function (request, response) {
    response.send('The Subscriptions Create Form page works ok');
  });

  router.post('/', function (request, response) {
    response.send('The Subscriptions Add page works ok');
  });

  router.delete('/', function (request, response) {
    response.send('The Subscriptions Delete page works ok');
  });

  router.get('/:id', function (request, response) {
    response.send('The Subscriptions See page works ok');
  });
  ```

- [x] MVC: Create controllers files.

<img src="/Users/jp/Documents/JPDevM/Dev/JPDevM CV on GitHub/node_practice/98-Practice_JP/public/images/docs/Controllers-files.png" alt="Controllers-files" style="zoom:50%;" />

- [x] MVC: Tell routes the controller method.

  subscriptionsRouter.js (idem with staticRouter.js, promotionsRouter.js, usersRouter.js)

  ```js
  // Require the controller
  const controller = require('../controllers/subscriptionsControllers');

  router.get('/', controller.browse);
  router.get('/:id/edit', controller.edit);
  router.put('/:id', controller.update);
  router.get('/create', controller.add);
  router.post('/', controller.create);
  router.delete('/', controller.delete);
  router.get('/:id', controller.read);
  ```

- [x] MVC: Create the controller methods.

  > Create standard methods

  subscriptionsControllers.js (idem with staticControllers.js, promotionsControllers.js, usersControllers.js)

  ```js
  module.exports = {
    browse: (request, response) => {
      return response.send('The Subscriptions See All page works ok');
    },

    edit: (request, response) => {
      return response.send('The Subscriptions Edit Form page works ok');
    },

    update: (request, response) => {
      return response.send('The Subscriptions Edit One page works ok');
    },

    add: (request, response) => {
      return response.send('The Subscriptions Create Form page works ok');
    },

    create: (request, response) => {
      return response.send('The Subscriptions Add page works ok');
    },

    delete: (request, response) => {
      return response.send('The Subscriptions Delete page works ok');
    },

    read: (request, response) => {
      return response.send('The Subscriptions See page works ok');
    },
  };
  ```

- [x] MVC: Install template engine - views

  > Documentation: http://expressjs.com/es/guide/using-template-engines.html

  app.js

  ```js
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
  ```
