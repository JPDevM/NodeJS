/*
  Express
*/
const express = require('express');
const app = express();

app.listen(8080, 'localhost');

// Requerimos la ruta
const mainRoutes = require('./routes/mainRoutes'); // Ruta para las View
const subscriptionRoutes = require('./routes/subscriptionRoutes'); // Ruta para manipular las subscriptions

// http://expressjs.com/en/4x/api.html#app.use
// path: es el grupo de rutas que se va a ejecutar.
// callback: archivo que va a administrar estas rutas.
app.use('/', mainRoutes); // Views
app.get('/subscrption', subscriptionRoutes); // Manipular subscripciones

/*
  FyleSystem (fs)
*/
const fs = require('fs');

// Traemos el contenido las subscripciones.
// let subs = fs.readFileSync('./assests/js/data.json', 'UTF-8');

// Convertimos el contenido a un array para poder trabajarlo.
// let subsArray = JSON.parse(subs);

/*
  Dinero
*/
const dinero = require('dinero.js');
