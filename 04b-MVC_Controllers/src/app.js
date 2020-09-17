const express = require('express');
const path = require('path');

// 1. Instanciar la aplicación de express
const app = express();

// 2. Levantar el servidor
app.listen(3000, function () {
  console.log('Servidor andando en el puerto 3000');
});

// Preguntar el orden en que hicimos las cosas a Javi.

/*
	ABM => Alta, Baja, Modificación
	CRUD => Create, Read, Update, Delete
	BREAD => Browse, Read, Edit, Add, Delete
*/ 

/*  
		1. Creamos los ROUTERS. 
			Los modularizamos; staticRouter, productsRouter.  
			Un ROUTER es una "entidad" dentro de tu aplicación
			Ej: entidad -> users
			Queremos poder:
				- Ver todos los usuarios (Browse)
				- Ver un usuario (Read)
				- Editar un usuario (Edit)
				- Crear un usuario (Add)
				- Borrar un usuario (Delete)
*/

/* 
		2. Creamos los CONTROLLERS.
			Un CONTROLLER es un archivo que contiene los métodos que van a usar cada una de las rutas del ROUTER.
*/

/*  
		3. Creamos las VIEWS.
			¿?
			Sacamos afuera los headers 
*/

// Setup de la carpeta de archivos públicos
const publicFolder = express.static(path.resolve(__dirname, '../public/'));
app.use(publicFolder);

// Setup del template engine - views
app.set('view engine', 'ejs'); // Setear el motor de vistas que vamos a usar
app.set('views', './src/views'); // Ubicación de la carpeta de las vistas

// Usando los Routers
const staticRouter = require('./routes/staticRouter');
app.use('/', staticRouter);

const productsRouter = require('./routes/productsRouter');
app.use('/productos', productsRouter);

const usersRouter = require('./routes/usersRouter');
app.use('/usuarios', usersRouter);

// 404 Not Found
app.get('*', function (request, response) {
  response.send('404 - Not found');
});
