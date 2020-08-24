let paises = ['Argentina', 'España', 'Colombia', 'USA'];

/*
	.pop() => extrae el último
	.push() => inserta a lo último
	.shift() => extrae el primero
	.unshift() => inserta de primero
*/ 

let ultimoPais = paises.pop();
console.log(ultimoPais);

let y = paises.push('Inglaterra');

let elPrimero = paises.shift();
console.log(elPrimero);

paises.unshift('Uruguay');

/*
	.splice(a, b) => extrae esos elementos del array. Modifica el array original.
	.slice(a, b) => toma una tajada del array. Copia esos elementos del array original. No modifica el array original.
*/

console.log('======');
console.log(paises);
console.log('======');

let dosPaises = paises.slice(1, 3);
console.log(dosPaises);

let otrosPaises = paises.splice(1, 3);
console.log(otrosPaises);

console.log(paises);

/*
	Buscan un elmento dentro del array. Retornan el índice de ese elemento. Retornan -1 si no encuentran el elemento.
	
	.indexOf() => retorna el índice de la 1er ocurrencia
	.lastIndexOf() => retorna el índice de la última ocurrencia
*/

let frutas = ['Manzana', 'Pera', 'Naranja', 'Banana', 'Pera'];

console.log( `La pera está en el índice: ${frutas.indexOf('Pera')}`);
console.log( `La pera está en el índice: ${frutas.lastIndexOf('Pera')}`);
console.log( `La pera está en el índice: ${frutas.lastIndexOf('pera')}`);
console.log( `La kiwi está en el índice: ${frutas.indexOf('Kiwi')}`);

// Extrayendo la naranja del array
let indiceNaranja = frutas.indexOf('Naranja');
let laNaranja = frutas.splice(indiceNaranja, 1);
console.log(laNaranja);

console.log(frutas);

console.log('==== FOR ====');
console.time();
for (let i = 0; i < frutas.length; i++) {
	console.log(frutas[i]);
}
console.timeEnd();

console.log('==== FOR OF ====');
console.time();
for (let fruta of frutas) {
	console.log(fruta);
}
console.timeEnd();

console.log('==== FOREACH ====');
console.time();
frutas.forEach(function (fruta) {
	console.log(fruta);
});
console.timeEnd();

/*
	Estos 3 métodos siempre retorna algo
	.map() => Retorna un array. El array retornado siempre tendrá la misma longitud que el array original.
	.filter() => Retorna un array. El array retornado puede ser distinto de longitud que el array original.
	.reduce() => Retorna una dato
*/ 
console.log('==== MAP ====');
let frutasModificadas = frutas.map(function (fruta) {
	return `${fruta} nueva`;
});
console.log(frutasModificadas);

let frutasSinBanana = frutas.map(function (fruta) {
	return fruta !== 'Banana';
});
console.log(frutasSinBanana);

console.time();
let frutasSinBananaV2 = frutas.filter(function (fruta) {
	return fruta !== 'Banana';
});
console.timeEnd();
console.log(frutasSinBananaV2);

// Filtrando con forEach
let nuevasFrutas = [];
console.time();
frutas.forEach(function (fruta) {
	if (fruta !== 'Banana') {
		nuevasFrutas.push(fruta);
	}
});
console.timeEnd();
console.log(nuevasFrutas);

let reduccionDeFrutas = frutas.reduce(function (acumulador, fruta) {
	return `${acumulador} ${fruta}`;
}, 'me gusta la ')
console.log(reduccionDeFrutas);

let gastos = [235, 456, 324.56, 687.80, 10];

let precioFinal = gastos.reduce(function (acum, precio) {
	return acum + precio;
}, 50);

console.log(precioFinal);