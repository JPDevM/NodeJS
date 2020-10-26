const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

const controller = require('../controllers/subscriptionsController');

// BREAD
// Respond to http://localhost:5000/subscriptions
router.get('/', controller.browse);
// router.get('/:id/edit', controller.edit); // Sacamos esta ruta, ya que su único objetivo era renderizar una vista. En API no se renderizan vistas
router.put('/:id', controller.update);
// router.get('/create', controller.add); // Sacamos esta ruta, ya que su único objetivo era renderizar una vista. En API no se renderizan vistas
router.post('/', controller.create); 

router.delete('/:id', controller.delete);

router.get('/search', controller.search);

router.get('/:id', controller.read);

module.exports = router;