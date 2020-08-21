// Express
// https://expressjs.com/

const express = require('express');
const fs = require('fs');

// 1. Generar nuestra aplicación
const app = express(); 

// 2. Levantar el servidor => http://localhost:3000
app.listen(3000, function () {
	console.log('Servidor andando en el puerto 3000');
	console.log('Ahora podemos entrar a http://localhost:3000');
});

// Sistema de ruteo
/* 
	1. Necesitamos usar la constante app
	2. Necesitamos definir el MÉTODO HTTP que vamos a usar
		Los métodos de HTTP para express necesitan de 2 argumentos:
			a. Nombre de la ruta -> String
			b. Controlador -> Function
	3. Necesitamos definir qué hace el controlador
		El controlador, es una función tipo callback que nos permite definir la respuesta que vamos a enviar cuando nos llegue una petición.
		Esta función toma dos parámetros:
			- 1er parámetro - Objeto literal que representa al REQUEST
			- 2do parámetro - Objeto literal que representa al RESPONSE
*/

// Ruta que atiende a http://localhost:3000/
app.get('/', function (req, res) {
	// Enviando una respuesta al cliente
	res.send('Estás en la home');
});

// Ruta que atiende a http://localhost:3000/api/users
app.get('/api/users', (req, res) => {
	// 1. Leer el achivo
	let fileContent = fs.readFileSync('./src/data/users.json', 'utf-8');

	// 2. Convertir el contenido a un array
	let finalData = JSON.parse(fileContent);

	// 3. Enviamos la respuesta con el contenido	
	res.send(finalData);
});

// Ruta que atiende a http://localhost:3000/api/user/:id
// Un parámetro en la ruta es algo que va a cambiar
// Para definir que una parte de la ruta es un parámetro tenemos que anteceder el nombre con :
app.get('/api/user/:id', (req, res) => {
	let userID = req.params.id;

	if (isNaN(userID)) {
		return res.json({
			status: 400,
			message: 'El parámetro debe ser un número'
		});
	}

	// 1. Leer el achivo
	let fileContent = fs.readFileSync('./src/data/users.json', 'utf-8');

	// 2. Convertir el contenido a un array
	let usersArray = JSON.parse(fileContent);

	// 3. Buscar al usuario con ese ID
	let user = usersArray.find(function (oneUser) {
		return oneUser.id == userID;
	});

	if (user !== undefined) {
		// Envíamos al usuario que encontramos
		return res.json(user);
	}

	// Solamente cuando no encontraste al usuario
	return res.json({
		status: 500,
		message: 'No encontramos un usuario con ese ID'
	});
});

// ¡Este método es de prueba, no suele usarse así!
// Ruta que atiende a http://localhost:3000/api/users/add
app.get('/api/users/add', (req, res) => {
	// 1. Leer el achivo
	let fileContent = fs.readFileSync('./src/data/users.json', 'utf-8');

	// 2. Convertir el contenido a un array
	let usersArray = JSON.parse(fileContent);

	// 3. Nuevo usuario
	let newUser = {
		id: 33,
		first_name: 'Freddy',
		last_name: 'Mercury',
		email: 'freddym@gmail.uk',
		gender: 'Male'
	}

	// 4. Insertar el nuevo usuario al array de usuarios
	usersArray.push(newUser);

	// 5. Escribir de nuevo TODO el archivo
	fs.writeFileSync('./src/data/users.json', JSON.stringify(usersArray, null, ' '));

	// 6. ¿Qué respuesta envíamos?
	res.send('Se guardó el usuario');
});

// Agregar un usuario a través de parámetros
// Parámetros optativos - Agregar un ? despues del nombre
app.get('/api/users/addUser/:name?/:lastName?', (req, res) => {
	// 1. Leer el archivo
	// 2. Convertir a array el contenido del archivo
	// 3. Crear el usuario nuevo
	// 4. Insertar el usuario nuevo en el array de usuarios
	// 5. Reescribir el archivo JSON
	// 6. Enviar una respuesta al cliente
	console.log(req.params);
	return res.send('Agregando usuario');
})

// nodemon
/*
	nodemon nos permite hacer cambios en nuestros archivos y no tener que reiniciar el servidor
	Si queremos reiniciar el servidor a mano tendríamos que:
		1. ctrl + c (detiene el proceso de la terminal)
		2. node src/app.js (ejecuta todo lo que tenga el archivo app.js)

	Se puede instalar nodemon de manera global, para no tener que instalarlo en cada proyecto:

	npm i nodemon -g

	Una vez instalado, vamos a ejecutar el archivo app.js así:

	nodemon src/app.js
*/

// API REST -> https://www.idento.es/blog/desarrollo-web/que-es-una-api-rest/

// GET -> api/users => Obtengo todo
// GET -> api/user/:id => Obtengo uno
// POST -> api/users => Guardo uno
// PUT / PATCH -> api/user/:id => Edito uno
// DELETE -> api/user/:id => Borro uno