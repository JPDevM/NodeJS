// Server on http://localhost:5000/
var express = require('express');
var cors = require('cors');
var app = express();

// Packages
const path = require('path');
var fs = require('fs');
var passport-http = requiere('passport-http'); // Modificar
var passport-facebook = requiere('passport-facebook'); // Modificar
app.use(cors());
require('dotenv').config();

console.log(`Hi ${process.env.DB_NAME}, have a nice day!`);
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
app.listen(port, () => console.log(`Server on http://${host}:${port}/`)); 

// Public files folder setup
const publicFolder = express.static(path.resolve(__dirname, '../public/'));
app.use(publicFolder);

// Template engine - views
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//acá poner passport

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