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

// Ejemplo readFile() - Asíncrono que no se usa mucho
// fs.readFile('data/users.json', 'UTF-8' , function (error, data) {
// 	if (error) {
// 		console.log(error);
// 		return
// 	}
// 	console.log(data);
// });

// fs.mkdirSync('./carpeta-de-prueba');

// Traemos el contenido del archivo.
let users = fs.readFileSync('./data/users.json', 'UTF-8');

// Convertimos el contenido a un array para poder trabajarlo.
let usersArray = JSON.parse(users);

// Nuevo usuario.
let newUser = {
  id: 32,
  first_name: 'Javi',
  last_name: 'Herrera',
  email: 'javi@gmail.com',
  gender: 'Male',
};

// Agregamos el Nuevo Usuario al Array con el contenido.
usersArray.push(newUser);

// Convertimos el array a formato JSON.
let usersArrayJSON = JSON.stringify(usersArray, null, ' ');

// Escribimos el documento con la nueva información.
fs.writeFileSync('./data/users.json', usersArrayJSON);
// writeFileSync Pisa todos los datos del archivo.
