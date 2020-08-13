/*
	Module File System
*/
const fs = require('fs'); // Nativo

/*
	Con el módulo FS, vamos a poder leer, escribir y crear archivos.

	- Leyendo archivos
		fs.readFile() - Asíncrono
		Recibe 2 argumentos, el nombre del archivo y una funcion. La función toma 2 parámetros que serán: error y data.
		Si queremos el contenido del archivo, hay que pasar un 2 argumento con la codificación: 'UTF-8'

		fs.readFileSync() - Sincrónico
		Recibe 2 argumentos, el nombre del archivo y la codificación: 'UTF-8'
		Este método nos retorna el contenido del archivo que estamos leyendo

	- Escribiendo archivos
		fs.writeFile() - Asíncrono
		fs.writeFileSync() - Sincrónico
		Se re-escribe todo el archivo
*/ 

// fs.readFile('data/users.json', 'UTF-8' , function (error, data) {
// 	if (error) {
// 		console.log(error);
// 		return
// 	}
// 	console.log(data);
// });

// fs.mkdirSync('./carpeta-de-prueba');

// Traemos el contenido del archivo
let users = fs.readFileSync('./data/users.json', 'UTF-8');

// Convertimos el contenido a un formato que podamos trabajar
let usersArray = JSON.parse(users);

// Nuevo usuario
let newUser = {
	id: 32, 
	first_name: 'Javi', 
	last_name: 'Herrera', 
	email: 'javi@gmail.com', 
	gender: 'Male'
}

usersArray.push(newUser);

let usersArrayJSON = JSON.stringify(usersArray, null, ' ');

fs.writeFileSync('./data/users.json', usersArrayJSON);