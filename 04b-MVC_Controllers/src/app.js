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
		X. Creamos los CONTROLLERS.
			¿?
*/

/*  
		X. Creamos los ROUTERS. 
			Los modularizamos; staticRouter, productsRouter.  
*/

/*  
		X. Creamos las VIEWS.
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

// 404 Not Found
app.get('*', function (request, response) {
  response.send('404 - Not found');
});
