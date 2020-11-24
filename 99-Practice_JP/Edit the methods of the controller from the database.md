This file is a section of [Workflow to create backend with NodeJS](./README.md).

### Edit the methods of the controller usin JSON files.

> x

In the router file. e.g.:<u>subscriptionsControllers.js</u>

> Idem in the other controllers entities. e.i.: staticControllers.js, promotionsControllers.js, usersControllers.js

###### BROWSE

> Show all results.

```js
browse: (request, response) => {
  /* Database metod */
},
```

> Deliver a message of success or error. (Falta agregar el mensaje de error)

```js
browse: (request, response) => {
  /* Database metod */
},
```

> Paginate the API. Create a function.
>
> Params: page, max_per_page.
>
> Model: http://DB_HOST/DB_PORT/entity?page=2&max_per_page=10
>
> E.g.: http://localhost:5000/subscriptions?page=2&max_per_page=10

```js
	browse: (request, response) => {
		/* Database metod */
	},

```

###### UPDATE

```js
update: (request, response) => {
  /* Database metod */
},
```

###### CREATE

```js
create: (request, response) => {
  /* Database metod */
  },
```

###### DELETE

```js
delete: (request, response) => {
  /* Database metod */
},
```

###### READ

```js
read: (request, response) => {
 /* Database metod */
},
```

###### (Añadir el método SEARCH) (no lo llamo desde el router o nada... arreglar)

```js
search: (request, response) => {
 /* Database metod */
};
```

###### SEARCH

> Hacer la paginación de cantidad de resultados en el request de la API. Ejemplo (enviarte 20 registros).

```js
 // editar esto
};
```

# Terminar

