// VALIDAR: Con este archivo busco poder crear, editar, etc, la BD de Subscriptions o en su defecto los JSON

// Utilizamos el método Router de express
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.use(express.json()); // Para que express lea los archivos Json cuando una app cliente se lo envíe

// GET
router.get('/subscriptions', (request, response) => {
  // OBJETIVO:Mostrar el Json subscriptions.json
  // FS
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subsArray = JSON.parse(subs);

  request.json(/* enviar acá el valor pedido */);
});

// POST
router.post('/subscriptions/:id', (request, response) => {
  // OBJETIVO:leer el Json subscriptions.json y enviar el contenido solicitado po POST
  // FS
  request.send('POST received');
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subParam = JSON.parse(subs.id[request.params]);

  request.json(subParam);
});

// PUT
router.post('/subscriptions', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/add_existing.htm');
  response.sendFile(indexPath);
});

// EDIT
router.post('/subscriptions', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/add_existing.htm');
  response.sendFile(indexPath);
});

// DELETE
router.post('/subscriptions/:id', (request, response) => {
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subParam = JSON.parse(subs.id[request.params]);

  // FS falta buscar el parámetro y eliminarlo
});
