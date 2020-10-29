# Workflow JP

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

  > Subscription, Promotions, Static.
  > If preparing the backend to consume as API with the frontend, static is not defined as entity.
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
      There are 2 ways here:

a. Prepare the backend to consume as an API with the frontend.

subscriptionsRouter.js (idem with staticRouter.js, promotionsRouter.js, usersRouter.js)

```js
// Require the controller
const controller = require('../controllers/subscriptionsControllers');

router.get('/:id/edit', controller.edit);
router.get('/create', controller.add);
router.post('/', controller.create);
router.delete('/', controller.delete);
router.get('/:id', controller.read);
```

> router.get('/', controller.browse);
> router.put('/:id', controller.update);
> These controllers are not created because they will not render views.

- [x] MVC: Create the controller methods.

  > Create standard methods

  subscriptionsControllers.js (idem with staticControllers.js, promotionsControllers.js, usersControllers.js)

  ```js
  module.exports = {
    browse: (request, response) => {
      return response.json(subscriptions);
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

b. The controller will render the views.

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

- [x] MVC: // Public files folder setup.
      app.js
  ```js
  const path = require('path');
  const publicFolder = express.static(path.resolve(__dirname, '../public/'));
  app.use(publicFolder);
  ```
- [x] MVC: Install template engine - views

  > Documentation: http://expressjs.com/es/guide/using-template-engines.html

  app.js

  ```js
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
  ```

- [x] MVC: Create views files.

<img src="/Users<%- include('../partials/head') %>

  <body>
    <h2>Read</h2>
    <p>The Users See page works ok</p>
  </body>

  </html>/jp/Documents/JPDevM/Dev/JPDevM CV on GitHub/node_practice/98-Practice_JP/public/images/docs/View-files.png" alt="View-files" style="zoom:50%;" />

read.ejs (idem with add.ejs, browse.ejs, edit.ejs in wich entities)

```html

```

- [x] MVC: Tell controller to display view files instead of text.

  subscriptionsController.js (idem with promotionsRouter.js, usersRouter.js)

  ```js
    browse: (request, response) => {
      return response.render('subscriptions/browse');
    },

    edit: (request, response) => {
      return response.render('subscriptions/edit');
    },

    add: (request, response) => {
      return response.render('subscriptions/add');
    },

    read: (request, response) => {
      return response.render('subscriptions/read');
    },
  ```

-------- acá seguro faltan más cosas para terminar el MVC, por ejemplo terminar los métodos.

- [x] Rest API: Create a Json file in src for each entity with its data.

- [x] Rest API: Set the Json Objet.
      app.js

  ```js
  app.use(expess.json());
  ```

- [x] Rest API: Set how Express handles information in forms.
      app.js
  ```js
  app.use(express.urlencoded({ extended: false }));
  ```

## Construcción de una API

Siempre vamos a usar 5 métodos que son:

- get (2 -> all / one)
- post
- put / patch
- delete

### get

Con esta ruta vamos a obtener todos los registros de una entidad:

```js
// Ruta - TODOS
router.get('/', controller.browse);

// Controller
browse: (request, response) => {
  return response.json(subscriptions);
},
```

### put

Ruta para editar un recurso

```js
// Ruta - TODOS
router.put('/:id', controller.update);

// Controller
update: (request, response) => {
  // Lógica de actualizar un registro
  /*
    1. Buscar el registro
    2. En ese registro hacés la actualizaciones
    3. Guardar las actualizaciones
    4. Arrojar un mensaje de éxito
  */
};
```

json Models lo utilizo porque como uso Json, saco los métodos más comunes afuera
json Models I use it because as I use Json, I pull the most common methods outside

las rutas o controladores o sus métodos (no sé) ahora envian respuestas Json por que son APIs
routes or controllers or their methods (I don't know) now send Json responses because they are APIs

https://www.npmjs.com/package/cors

Extraigo las variables de desarrollo en archivos de producción .env y hago la documentación .env.example

requiero lainstalo la librería
https://www.npmjs.com/package/dotenv

utilizo process.env para extraer las vaiables
las pongo utilizo en app.js y ahora van a ser dínámicas

---

librería para el logueo social.
http://www.passportjs.org/

---

Si hago pública la API.
Hacer la paginación de cantidad de resultados en el request de la API. Ejemplo (enviarte 20 registros). En el único que se envía más de uno es el método browse, (en la búsqueda tambien necesito uno, en caso de desarrollar ete método)
ver el tema de los token en la API (ver ejemplo en promotionsController)
(el método serch se define desde el controlador, añadirlo en el lugar que va en el readme.md)
Tengo que ver cuantas request pueden hacer por usuario.
Documentación
