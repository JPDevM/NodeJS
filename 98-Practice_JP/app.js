// Server on http://localhost:5000/
var express = require('express');
var app = express();
app.listen(5000, () => console.log('Server on http://localhost:5000/'));

// Packages
var fs = require('fs');
// const path = require('path');
// var moment = require('moment');

app.get('/', function (req, res) {
  res.send('Server ok');
});

// Routers
const staticRouter = require('./src/routes/staticRouter'); 
  app.use('/', staticRouter);

const subscriptionRouter = require('./src/routes/subscriptionRouter');
  app.use('/subscriptions', subscriptionRouter);

const usersRouter = require('./src/routes/usersRouter');
  app.use('/users', usersRouter);

// 404 Not Found
app.get('*', function (request, response) {
  response.send('404 - Not found');
});