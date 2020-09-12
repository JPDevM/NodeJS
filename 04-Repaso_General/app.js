// Requerir el archivo calculadora - Módulo propio
const calculadora = require('./calculadora');

// Requerir el módulo File System - Módulo Nativo
const fs = require('fs');

// Requerir el módulo Path - Módulo Nativo
const path = require('path');

// Requerir momentjs - Módulo externo
const moment = require('moment');
moment.locale('es-ar');
let fechaActual = moment().format('LL');

console.log('Este es el archivo app.js');

let resultadoSuma = calculadora.sumar(5, 4);
let resultadoResta = calculadora.restar(50, 40);

console.log(resultadoSuma);
console.log(resultadoResta);

// Imprimir la ubicación de una carpeta
let rutaFinal = path.resolve(__dirname, '../') + '/test';

// Asíncrono
// fs.mkdir(rutaFinal, function (error) {
// 	if (error) {
// 		console.log(error);
// 	}
// 	fs.writeFile(path.resolve(rutaFinal, 'saludo.txt'), 'Saludos a todos', function (error) {
// 		if (error) {
// 			console.log(error);
// 		}
// 	});
// });

// Síncrono
// fs.mkdirSync(rutaFinal);
fs.writeFileSync(path.resolve(rutaFinal, 'saludo.txt'), 'Hoy es ' + fechaActual);

