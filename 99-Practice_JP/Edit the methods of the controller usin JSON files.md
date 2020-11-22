### Edit the methods of the controller usin JSON files.

> Create generic models of json methods. [See jsonModels file](/src/models/jsonModel.md)
> Created methods: toArray ( ), find (id).

In the router file. e.g.:<u>subscriptionsControllers.js</u>

> Idem in the other controllers entities. e.i.: staticControllers.js, promotionsControllers.js, usersControllers.js

###### BROWSE

> Show all results.

```js
browse: (request, response) => {
  return response.json(subscriptions,);
},
```

> Deliver a message of success or error. (Falta agregar el mensaje de error)

```js
browse: (request, response) => {
  return response.json(
    meta: {
      status: 200,
      message: 'successful',
    },
    data: subscriptions,
  );
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
		const START_PAGE = 1;

    // E.g.: http://localhost:5000/subscriptions?c=2&max_per_page=10
		var currentPage = parseInt(request.param('page'));
		var maxPerPage = parseInt(request.param('max_per_page'));
		var totalPage = Math.ceil(subscriptionsArray.length / maxPerPage);
		var nextPage = currentPage >= totalPage ? totalPage : currentPage + 1;
		var lastPage = totalPage;
		var previousPage = currentPage <= START_PAGE ? START_PAGE : currentPage - 1;
		var firstPage = 1;

		if(currentPage < START_PAGE || maxPerPage < START_PAGE) {
			return response.json({
				meta: {
					status: 404,
					message: 'Page or max_per_page null value',
				},
			});
		}
		else if(typeof currentPage == 'undefined') {
			// currentPage undefined.
			currentPage = START_PAGE;
		}
		else if(currentPage > totalPage){
			// currentPage is bigger than lastPage.
			currentPage = totalPage;
		}

		var buffer = subscriptionsArray.slice((currentPage-1)*maxPerPage, (currentPage*maxPerPage));

		var responseBuffer = {
			'objectCount': subscriptionsArray.length,
			'currentPage': currentPage,
			'pageSize': maxPerPage,
			'totalPage': totalPage,
			'data': buffer,
			'links': {
				'first': firstPage,
				'previous': previousPage,
				'self': currentPage,
				'next': nextPage,
				'last': lastPage,
			}
		};

		return response.json(responseBuffer);
	},

```

###### UPDATE

```js
update: (request, response) => {
  // Logic to update a record:

  // 1. Search the record to update.
  let theSub = subscriptions.find(function (oneSub) {
    return oneSub.id == request.params.id;
  });

  // 2. Make the update on that record.
  theSub.name = request.body.newName;
  theSub.logoIcon = request.body.newLogoIcon
    ? request.body.newLogoIcon
    : theSub.logoIcon;

  // 3. Save the changes.
    // a. Traverse the array of subscriptions
    // b. Find the subscription you want to modify
    // c. Resave all the JSON

  // 4. Deliver a message of success.
  return response.json({
    meta: {
      status: 200,
      message: 'successful',
    },
    data: theSub,
  });
},
```

###### CREATE

```js
create: (request, response) => {
  let newSubscription = request.body;

  if (isNaN(request.body.price)) {
    return response.status(500).json({
      statusCode: 500,
      message: 'El price debe contener solamente números.'
    })
  }

  if (request.body.name === undefined) {
    return response.status(500).json({
      statusCode: 500,
      message: 'El name es necesario para guardar el registro.'
    })
  }

  let lastId = subscriptions[subscriptions.length -1].id;
  newSubscription.id = Number(lastId) + 1;
  subscriptions.push(newSubscription);
  fs.writeFileSync(filePath, JSON.stringify(subscriptions, null, ' '));
  return response.json(newSubscription);
  },
```

###### DELETE

```js
delete: (request, response) => {
  let id = request.params.id;
  let theSubscription = subscriptions.find(function (oneSubscription) {
    return oneSubscription.id === id;
  })
  return response.json({
    subscription: theSubscription,
    message: 'Vamos a borrar esa suscripción'
  });
},
```

###### READ

```js
read: (request, response) => {
  try {
    let id = request.params.id;
    let theSubscription = subs.find(id);
    if (theSubscription) {
      return response.json(theSubscription)
    }
    return response.status(404).json({
      meta: {
        status: 404,
        message: 'El id no existe'
      }
    })
  } catch (error) {
    return response.status(500).json({
      meta: {
        status: 500,
        message: error
      }
    })
  }
},
```

###### (Añadir el método SEARCH) (no lo llamo desde el router o nada... arreglar)

```js
search: (request, response) => {
  let queryString = request.query;
  if (queryString.name) {
    let name = queryString.name;
    let theSubscription = subscriptions.find(function (oneSubscription) {
      return oneSubscription.name.toLowerCase() === name.toLowerCase();
    });
    return response.json(theSubscription);
  }
  return response.send('No se encontró nada');
};
```

###### SEARCH

> Hacer la paginación de cantidad de resultados en el request de la API. Ejemplo (enviarte 20 registros).

```js
 // editar esto
};
```

# Terminar

