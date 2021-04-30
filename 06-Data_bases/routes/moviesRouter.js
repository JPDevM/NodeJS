const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviesController');

// GET => http://localhost:3000/movies
router.get('/', controller.all);

// POST => http://localhost:3000/movies
router.post('/', controller.store);

// DELETE => http://localhost:3000/movies/id
router.delete('/:id', controller.delete);

// GET => http://localhost:3000/movies/top-5
router.get('/top-5', controller.top5);

// GET => http://localhost:3000/movies/one/:id
router.get('/one/:word', controller.one);

// GET => http://localhost:3000/movies/:id
router.get('/:id', controller.detail)

module.exports = router;