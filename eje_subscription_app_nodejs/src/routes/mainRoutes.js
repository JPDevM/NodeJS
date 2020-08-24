// Utilizamos el método Router de express
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Generamos rutas
// Con router.get genero una ruta para consumirse desde la url del navegador. Neceita 2 arg.
// 1. String ruta. 2. Función controladora
// Utilizamos FS para leer el contenido del archivo HTML. (existe un método mejor --> sendFile y path)
router.get('/', (request, response) => {
  const indexHtml = fs.readFileSync('./views/index.html', 'UTF-8');
  response.send(indexHtml);
});

router.get('/test', (request, response) => {
  // https://nodejs.org/api/path.html#path_path_resolve_paths
  // __dirname: me da la ubicación actual de este archivo. Independientemente de donde está alojado el código. Eje. AWS, Mac OS, etc
  // path.resolve: genero la ruta absoluta
  const indexPath = path.resolve(__dirname, '../views/index.html');
  // console.log(indexPath);
  response.sendFile(indexPath);
});

router.get('/add_custom', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/add_custom.html');
  response.sendFile(indexPath);
});

router.get('/setting', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/add_existing.html');
  response.sendFile(indexPath);
});

// router.get('/xxx', (request, response) => {
//   const indexPath = path.resolve(__dirname, '../views/xxx.html');
//   response.sendFile(indexPath);
// });

router.get('/setting', (request, response) => {
  const indexPath = path.resolve(__dirname, '../views/setting/setting.html');
  response.sendFile(indexPath);
});

router.get('/setting_currency', (request, response) => {
  const indexPath = path.resolve(
    __dirname,
    '../views/setting/setting_currency.html'
  );
  response.sendFile(indexPath);
});

router.get('/setting_font', (request, response) => {
  const indexPath = path.resolve(
    __dirname,
    '../views/setting/setting_font.html'
  );
  response.sendFile(indexPath);
});

router.get('/setting_mySubscriptions_total', (request, response) => {
  const indexPath = path.resolve(
    __dirname,
    '../views/setting/setting_mySubscriptions_total.html'
  );
  response.sendFile(indexPath);
});

router.get('/setting_order', (request, response) => {
  const indexPath = path.resolve(
    __dirname,
    '../views/setting/setting_order.html'
  );
  response.sendFile(indexPath);
});

router.get('/setting_theme', (request, response) => {
  const indexPath = path.resolve(
    __dirname,
    '../views/setting/setting_theme.html'
  );
  response.sendFile(indexPath);
});

// Exportamos las rutas
module.exports = router;
