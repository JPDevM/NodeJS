const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});

/*
  Express
*/
const express = require('express');
const app = express();

app.get('/ping', (request, response) => {
  response.send('pong');
});
app.listen(8080, 'localhost');

/*
  FyleSystem (fs)
*/
const fs = require('fs');

// Traemos el contenido las subscripciones.
let subs = fs.readFileSync('./assets/js/data.json', 'UTF-8');

// Convertimos el contenido a un array para poder trabajarlo.
let subsArray = JSON.parse(subs);

/*
  Dinero
*/
const dinero = require('dinero');
