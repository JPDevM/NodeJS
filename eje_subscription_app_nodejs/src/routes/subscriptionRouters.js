// Utilizamos el método Router de express
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET
router.get('/', (request, response) => {
  // OBJETIVO: Mostrar el Json subscriptions.json
  // FS
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subsArray = JSON.parse(subs);

  response.json(subsArray);
});

router.get('/:id', (request, response) => {
  // OBJETIVO:leer el Json subscriptions.json y enviar el contenido solicitado por POST
  // FS
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subArray = JSON.parse(subs);
  // Recorrer array, busco el objeto con el Id que traigo por parámetro
  let subParam = subArray.id[request.params];
  response.json(subParam);
});

router.post('/', (request, response) => {
  response.json(request.body); // Express Necesita express.urlencoded
});

// PUT || PATCH
// Métodos para editar
// PUT Reescribe todo el registro que se está editando
// PATCH Reescribe solo los datos que cambian.
router.patch('/id:', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/add_existing.htm');
  response.sendFile(indexPath);
});

// DELETE
router.delete('/:id', (request, response) => {
  let subs = fs.readFileSync('./data/subscriptions.json', 'UTF-8');
  let subParam = JSON.parse(subs.id[request.params]);

  // FS falta buscar el parámetro y eliminarlo
});

// Exportamos las rutas
module.exports = router;
