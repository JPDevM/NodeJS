// Vamos a elegir la tipografía del documento
// setting_font.html

let divBody = document.querySelector('body');
let containerFonts = document.querySelector('#containerFonts');
let fontsDivs = Array.from(containerFonts.querySelectorAll('div[id^=font]')); // 'div[id^=font]' todos los id que comienzan(^) en font
let allCheckIcons = Array.from(containerFonts.querySelectorAll('.fa-check'));
let previewCard = document.querySelector('#previewCard');
let previewMenu = document.querySelector('#previewMenu');

function fontEdit(event) {
  // event es el nombre de la variable que espera el evento click del addEventListener.
  // MouseEvent {isTrusted: true, screenX: 453, screenY: 280, …}
  let parent = event.currentTarget; // currenTarget Identifica el target (objetivo) actual del evento.
  // <div id="fontDancingScript" data-font="Dancing Script">
  let checkIcon = parent.querySelector('.fa-check');
  let newFont = parent.dataset.font; // La propiedad dataset en HTMLElement proporciona una interfaz lectura/escritura para obtener todos los atributos de datos personalizados.

  // Recorremos el array de allCheckIcons y les cambiamos las clases.
  allCheckIcons.forEach(function (oneCheckIcon) {
    oneCheckIcon.classList.remove('d-block');
    oneCheckIcon.classList.add('d-none');
  });

  // Agregamos el check al seleccionado.
  if (!checkIcon.classList.contains('d-block')) {
    checkIcon.classList.add('d-block');
  }

  // Cambiar la font de la preview.
  previewMenu.style.fontFamily = newFont;
  previewCard.style.fontFamily = newFont;
}

// La funcien escucha cada vez que se hace un evento click en un div que contiene tod la estructura de la font.
fontsDivs.forEach(function (oneDiv) {
  oneDiv.addEventListener('click', fontEdit);
});
