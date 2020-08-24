// Vamos a elegir la tipografía del documento.

// To-do: Cargar los elementos desde una array de fuentes.

// setting_font.html

let divBody = document.querySelector('body');
let containerFonts = document.querySelector('#containerFonts');
let fontsDivs = Array.from(containerFonts.querySelectorAll('div[id^=font]'));
let allCheckIcons = Array.from(containerFonts.querySelectorAll('.fa-check'));
let previewCard = document.querySelector('#previewCard');
let previewMenu = document.querySelector('#previewMenu');

function fontEdit(event) {
  let parent = event.currentTarget;
  let checkIcon = parent.querySelector('.fa-check');
  let newFont = parent.dataset.font;

  // Recorremos el array de allCheckIcons y les cambiamos las clases.
  allCheckIcons.forEach(function (oneCheckIcon) {
    oneCheckIcon.classList.remove('d-block');
    oneCheckIcon.classList.add('d-none');
  });

  // Mostramos el check al clickeado.
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
