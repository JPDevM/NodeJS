//?nombre=Javier&edad=456&colores=[%22amarrilo%22,%20%22azul%22,%20%22rojo%22]

let queryString = new URLSearchParams(location.search);

console.log(queryString.get('nombre'));
console.log(queryString.get('edad'));
let colores = JSON.parse( queryString.get('colores') );
console.log(colores);

let ul = document.querySelector('ul');

colores.forEach(unColor => {
	ul.innerHTML += `<li>${unColor}</li>`;
});