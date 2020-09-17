// Eventos en JS

/*
	- Eventos del objeto window
	- Eventos de los objetos del DOM

	Para aplicar un evento se captura previamente el objeto y sobre el se implementa la propiedad .onEventName

	Las propiedades que manejan los eventos reciben como valor una función anónima.

	let boton = document.querySelector('button');
	boton.onclick = function () {
		console.log('Hicimos click');
	}

	Como la anterior manera genera que se pisen los eventos. La mejor forma de aplicar los mismos será con un método llamado .addEventListener(STRING: eventName, FN: callback)
*/

// let btn01 = document.querySelector('#btn01');

// btn01.addEventListener('click', function () {
//   console.log('Hiciste click');
// });

// btn01.addEventListener('click', function () {
//   console.log('¡Este es otro evento click!');
// });

let divPrueba = document.querySelector('#divPrueba');

divPrueba.addEventListener('mouseover', function (event) {
  console.log('Over sobre el div');
  console.log(event.target.children);
});

divPrueba.addEventListener('mousemove', function (event) {
  console.log(`X: ${event.clientX}`);
  console.log(`Y: ${event.clientY}`);
});

let addCustomSubscriptionForm = document.querySelector(
  '#addCustomSubscriptionForm'
);

// Campos del formulario
let camposDelForm = Array.from(addCustomSubscriptionForm.elements);

let camposSinBotones = [];

camposDelForm.forEach(function (unCampo) {
  if (unCampo.type !== 'button') {
    camposSinBotones.push(unCampo);
  }
});

camposSinBotones.forEach(function (unCampo) {
  // Asignarle el evento a cada campo

  // focus -> al ingresar el cursor dentro del campo
  unCampo.addEventListener('focus', function () {
    console.log(`Ingresaste al campo: ${unCampo.name}`);
  });

  // Validar que el campo no esté vacío
  // blur -> se dispara al salir el cursor
  unCampo.addEventListener('blur', function () {
    console.log(`Saliste del campo: ${unCampo.name}`);
    let valorDelCampo = unCampo.value;
    if (valorDelCampo === '') {
      console.log('Este campo es obligatorio');
    }
  });
});
