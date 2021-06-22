const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

const controller = require('../controllers/promotionsController');

// BREAD - API
// Respond to http://localhost:5000/promotions
router.get('/', (req, res, next) => {
	console.log('Pasé por el MD');
	next();
}, controller.browse);
router.put('/:id', controller.edit);
router.post('/', controller.add);
router.delete('/:id', controller.delete);
router.get('/search', controller.search);
router.get('/:id', controller.read); // Siempre al final

module.exports = router;