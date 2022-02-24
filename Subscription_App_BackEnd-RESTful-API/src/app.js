// Server on http://localhost:5000/
// Packages
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const methodOverride = require('method-override'); // To make PUT requests in Express.
const session = require('express-session');
const path = require('path');

// Initiate app
const app = express();

// Configure app
app.use(cors()); // Enable All CORS Requests.
require('dotenv').config(); // enviroment variables .env
app.use(
  session({
    secret: 'a random word',
    resave: false,
    saveUninitialized: true,
  })
);

// Welcome menssaje
const USER = process.env.USER_NAME;
const PORT = process.env.APP_PORT;
const 
app.listen(5000, console.log( `Hi ${USER}, have a nice day! the server is now live in http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
);); // Port

// Public files folder setup
const publicFolder = express.static(path.resolve(__dirname, '../public/'));
app.use(publicFolder);

// Template engine - views
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middlewares
// urlencoded and json are needed for POST and PUT requests to send data (objects) to the server that is included in the body (request.body).
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // POST to PUT, PATCH, DELETE.

// Entities and statics routes
const staticRouter = require('./routes/staticRouter');
app.use('/', staticRouter);

const subscriptionsRouter = require('./routes/subscriptionsRouter');
app.use('/subscriptions', subscriptionsRouter);

const promotionsRouter = require('./routes/promotionsRouter');
app.use('/promotions', promotionsRouter);

const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

app.get('*', function (request, response) {
  // 404 Not Found
  response.send('404 - Not found');
});


