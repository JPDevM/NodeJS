// Server on http://localhost:5000/
var express = require('express');
var app = express();
app.listen(5000);

// Packages
var fs = require('fs');
const path = require('path');
var moment = require('moment');

console.log('Server on http://localhost:5000/');

app.get('/', function (req, res) {
  res.send('Server ok');
});
