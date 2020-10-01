const express = require('express');
const router = express.Router();

// Requerir el controller
const controller = require('../controllers/usersController');

// Middlewares
const { body } = require('express-validator');
const validations = [
	body('firstName')
		.not().isEmpty()
		.withMessage('El nombre es obligatorio'),
	body('email')
		.isEmail()
		.withMessage('El email debe ser un formato de correo válido'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('La contraseña debe tener al menos 8 caracteres')
];

// Para una BREAD por lo general son 7 rutas

// 1. Browse - Ver todos
router.get('/', controller.browse);

// 3. EDIT - Editar uno (formulario de edición)
router.get('/:id/editar', controller.edit);

// 4. EDIT - Editar uno
router.put('/:id', controller.update);

// 5. ADD - Agregar uno (formulario de creación)
router.get('/crear', controller.add);

// 6. ADD - Agregar uno (procesar la data que viene del formulario)
router.post('/', validations, controller.create);

// 7. DELETE - Borrar uno
router.delete('/:id', controller.delete);

router.get('/login', controller.login);

// 2. READ - Ver uno
router.get('/:id', controller.read);


module.exports = router;