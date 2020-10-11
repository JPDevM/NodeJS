// Server on http://localhost:5000/
var express = require('express');
var app = express();
app.listen(5000, () => console.log('Server on http://localhost:5000/'));

// Packages
var fs = require('fs');

// Template engine - views
app.set('view engine', 'ejs');
app.set('views', './src/views');

const staticRouter = require('./routes/staticRouter');
app.use('/', staticRouter);

const subscriptionsRouter = require('./routes/subscriptionsRouter');
app.use('/subscriptions', subscriptionsRouter);

const promotionsRouter = require('./routes/promotionsRouter');
app.use('/promotions', promotionsRouter);

const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

// 404 Not Found
app.get('*', function (request, response) {
  response.send('404 - Not found');
});