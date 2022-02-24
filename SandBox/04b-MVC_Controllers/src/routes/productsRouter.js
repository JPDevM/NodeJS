const express = require('express');
const router = express.Router(); // Instanciar el router de express

// Controller
const controller = require('../controllers/productsController');

// GET => http://localhost/productos
router.get('/', controller.index);

// GET => http://localhost/productos/:id
router.get('/:id', controller.show);

// GET => /productos/crear(formulario)
// POST => /productos (guarda en DB)
// GET => /productos/12 / editar(formulario con datos)
// PUT => /productos/12(actualiza en DB)
// DELETE => /productos/12(borra de la DB)

module.exports = router;