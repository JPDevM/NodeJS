/*
	Esto es un módulo propio.

	Para que todas las funcionalidades de este módulo se puedan consumir desde afuera, es necesario exportar las mismas. De lo contrario no vamos a poder utilizarlas.
*/

function sumar(n1, n2) {
	return n1 + n2;
}

function restar(n1, n2) {
	return n1 - n2;
}

function multiplicar(n1, n2) {
	return n1 * n2;
}

function dividir(n1, n2) {
	return n1 / n2;
}

let autor = 'Javi Herrera';

/*
	module.exports nos permite exponer hacia afuera, las funcionalidades internas de este archivo.

	Se puede exportar TODO o solo lo que nosotros deseemos.
*/
module.exports = {sumar, restar, multiplicar, dividir, autor};