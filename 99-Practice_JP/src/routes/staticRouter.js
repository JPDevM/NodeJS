const express = require('express');
const router = express.Router();
// https://expressjs.com/es/guide/routing.html

// routing to http://localhost:5000
router.get('/', function (request, response) {
  response.render('landing');
});

router.get('/docs', function (request, response) {
  response.send('The docs page works ok');
});

router.get('/setting', function (request, response) {
  response.render('setting/setting');
});

router.get('/api', function (request, response) {
  response.send('The api page works ok');
});

module.exports = router;
