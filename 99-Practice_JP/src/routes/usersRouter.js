const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

const controller = require('../controllers/usersController');

// BREAD
// Respond to http://localhost:5000/users
router.get('/', controller.browse);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.get('/create', controller.add);
router.post('/', controller.create);
router.delete('/', controller.delete);
router.get('/:id', controller.read);

module.exports = router;