const express = require('express');
const router = express.Router();

// Requerir el controller
const controller = require('../controllers/usersController');

// Para una BREAD por lo general son 7 rutas

// 1. Browse - Ver todos
router.get('/', controller.browse);

// 3. EDIT - Editar uno (formulario de edición)
router.get('/:id/editar', controller.edit);

// 4. EDIT - Editar uno
router.put('/:id', controller.update);

// 5. ADD - Agregar uno (formulario de creación)
router.get('/crear', controller.add);

// 6. ADD - Agregar uno
router.post('/', controller.create);

// 7. DELETE - Borrar uno
router.delete('/', controller.delete);

// 2. READ - Ver uno
router.get('/:id', controller.read);

module.exports = router;