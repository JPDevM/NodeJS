const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

// routing to http://localhost:5000
router.get('/', function (request, response) {
  response.send('The inicial page works ok');
});

router.get('/landing', function (request, response) {
  response.send('The Landing page works ok');
});

router.get('/api', function (request, response) {
  response.send('The API page works ok');
});

module.exports = router;
