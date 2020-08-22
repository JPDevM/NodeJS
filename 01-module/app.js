/*
	Módulos en NODE
	Son librería de JS que vienen con un montón de funcionalidades. Hay 3 tipos de módulos:

	1. Nativos => originarios de NODE
	2. De otros => originarios de otros desarrolladores - npm
	3. Propios => originarios de nosotros

	Para usar un módulo, necesitamos importarlo en nuestro archivo. Para importarlo lo hacemos a través de la función require(). 

	La función require() siempre recibe un string como argumento, ese string debe ser igual al nombre del módulo que queremos importar.

	Todos los módulos, son objetos literales que vienen con propiedades y métodos.

	Para instalar módulos de otros en nuestro proyecto, es necesario tener un archivo package.json. Este archivo va tener una referencia de tódos módulos que necesita nuestro proyecto para funcionar, por eso es importante. Para crear el archivo package.json de una manera sencilla, podemos ejecutar en la terminal el comando npm init / npm init -y (-y es YES a todo)
*/ 

// Módulo Nativo
const fs = require('fs');

let users = fs.readFileSync('./data/users.json', 'utf-8');
users = JSON.parse(users); // Esto parsea el string de formato JSON a un array de JS
console.log(users[456].first_name);

// Módulo de Otros
const cc = require('currency-codes');
const getSymbolFromCurrency = require('currency-symbol-map');
const currencyToSymbolMap = require('currency-symbol-map/map');
console.log(currencyToSymbolMap)
// console.log(cc.codes());

// Módulo propio
const operaciones = require('./operaciones/operaciones');
console.log(operaciones.sumar(100, 20));
console.log(operaciones.restar(100, 20));
console.log(operaciones.multiplicar(100, 20));
console.log(operaciones.dividir(100, 20));
console.log(operaciones.autor);

const saludos = require('./saludos'); // Importa automáticamente  el index
console.log(saludos.hola('Juan Pablo'));
console.log(saludos.hello('Juan Pablo'));
console.log(saludos.bondia('Juan Pablo'));