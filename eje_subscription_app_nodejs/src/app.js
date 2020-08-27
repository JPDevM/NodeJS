/*
  Express
*/
const express = require('express');
const app = express();

app.listen(8080, 'localhost');
app.use(express.json()); // Para que express lea los archivos Json cuando una app cliente se lo envíe
app.use(express.urlencoded({ extended: false })); // Parsea la información proveniente de un formulario. La convierte en un objeto literal y me sirve para verlo con request.body
app.use(express.static('../public')); // La carpeta pública va a ser un recurso estático por lo que nos va a dar acceso a ella.

// Requerimos la ruta
const mainRoutes = require('./routes/mainRoutes'); // Ruta para las View
const subscriptionRoutes = require('./routes/subscriptionRouters'); // Ruta para manipular las subscriptions

// http://expressjs.com/en/4x/api.html#app.use
// path: es el grupo de rutas que se va a ejecutar.
// callback: archivo que va a administrar estas rutas.
app.use('/', mainRoutes); // Views
app.use('/subscriptions', subscriptionRoutes); // Manipular subscripciones

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
