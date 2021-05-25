/*
  Express
*/
const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send('MainPage');
});
app.listen(8080, () => console.log('server on port 8080'));

/*
  FyleSystem (fs)
*/
const fs = require('fs');

// Traemos el contenido las subscripciones.
// let subs = fs.readFileSync('./assets/js/data.json', 'UTF-8');

// Convertimos el contenido a un array para poder trabajarlo.
// let subsArray = JSON.parse(subs);

/*
  Dinero
*/
const dinero = require('dinero.js');
