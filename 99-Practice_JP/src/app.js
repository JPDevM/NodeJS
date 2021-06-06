// Server on http://localhost:5000/
var express = require('express');
var cors = require('cors');
var app = express();
const session = require('express-session');

// Packages
const path = require('path');
var fs = require('fs');
// var passporthttp = require('passport-http'); // Modificar
// var passportfacebook = require('passport-facebook'); // Modificar
app.use(cors());
app.use(
  session({
    secret: 'a random word',
    resave: false,
    saveUninitialized: true,
  })
);
require('dotenv').config();

// Welcome menssaje
console.log(`Hi ${process.env.USER_NAME}, have a nice day!`);
const port = process.env.APP_PORT;
app.listen(port, (require, response) =>
  console.log(`Server on http://localhost:${port}/`)
);

// Public files folder setup
const publicFolder = express.static(path.resolve(__dirname, '../public/'));
app.use(publicFolder);

// Template engine - views
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Acá poner passport.

// Entities
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
