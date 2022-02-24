// Server on http://localhost:5000/
var express = require('express');
var app = express();
app.listen(5000, function () {
	console.log('Server on http://localhost:5000/');
});

// Packages
var fs = require('fs');
const path = require('path');
var moment = require('moment');

// Cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Session de Espress
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
	secret: 's3Cur3',
	name: 'sessionId', 
	saveUninitialized: false,
	resave: false,
}));

let users = [
	{name: 'Jhon Doe'},
	{name: 'Jane Dean'},
	{name: 'Juan Pa'},
]

// Middleware para session
app.use(function (req, res, next) {
	req.session.user = users[2];
	next();
});

app.get('/', function (req, res) {
	console.log(req.cookies);
	let user = req.session.user ? req.session.user : {name: 'Invitado'};
	res.send('Home - ' + user.name);
});

app.get('/services', function (req, res) {
	res.cookie('dePrueba', 'Esto es un texto cualquiera', { maxAge: 30000});
	let user = req.session.user ? req.session.user : { name: 'Invitado' };
	res.send('Services - ' + user.name);
});

app.get('/destroy', function (req, res) {
	res.clearCookie('dePrueba');
	res.send('Cookie destruida')
})
