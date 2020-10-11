const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

// // Requerimos el controller
// const controller = require('../controllers/staticController');

// // Atiende a http://localhost:3000
// router.get('/', controller.index);

// // Atiende a http://localhost:3000/about
// router.get('/about', controller.about);

// // Atiende a http://localhost:3000/api
// router.get('/api', controller.api);



// routing to http://localhost:3000
router.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// Routing to http://localhost:3000/subscription

// Routing to http://localhost:3000/users

module.exports = router;
