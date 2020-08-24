console.log('Trabajando con el DOM');

// Objeto Literal
const car = {
	brand: 'Renault',
	model: 2020,
	colors: ['red', 'yellow', 'orange'],
	honk: function () {
		return 'Peee Peeeeee!'
	}
}

console.log(car.brand);
console.log(car.honk());

console.log(document.URL);
console.log(document.write('<h2>Hola mundo desde JS</h2>'));

// Selectores del D.O.M. de JS
/*
	document.getElementById('unID');
		Object

	document.querySelector('#id');
	document.querySelector('.class');
	document.querySelector('.class tag');
		Object

	document.querySelectorAll('');
		NodeList - Array

	document.getElementsByTagName();
		HTMLCollection - Object
*/

const title = document.querySelector('h1');
console.log(title);

const specialQS = document.querySelector('#special');
const specialByID = document.getElementById('special');
console.log(specialQS);
console.log(specialByID);

const anchors = document.querySelectorAll('.anchor');

console.log('Iterando con FOR');
for (let i = 0; i < anchors.length; i++) {
	// console.log('El href del enlace ' + i + ' es ' + anchors[i].href);
	console.log('El href del enlace ' + i + ' es ' + anchors[i].getAttribute('href'));
}
console.log('===========');

console.log('Iterando con FOREACH');
anchors.forEach(function (oneAnchor, i) {
	console.log('El href del enlace ' + i + ' es ' + oneAnchor.getAttribute('href'));
});
console.log('===========');

const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs); // HTMLCOllection
// console.log(paragraphs[0]); // <p> en el índice 0

console.log('Iterando con FOR a paragraphs');
for (let i = 0; i < anchors.length; i++) {
	console.log(paragraphs[i]);
}
console.log('===========');

const paragraphsV2 = document.querySelectorAll('p');

console.log(paragraphsV2);
console.log('Iterando con FOREACH paragraphsV2');
paragraphsV2.forEach(function (paragraph, i) {
	console.log(paragraph);
	paragraph.setAttribute('title', 'Este párrafo está en el índice ' + i);
});
console.log('===========');