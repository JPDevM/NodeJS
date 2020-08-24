// Vamos a elegir la tipografía del documento
// setting_font.html

let divBody = document.querySelector('body');

function fontEdit(idFont, newFont) {
  let previewCard = document.querySelector('#previewCard');
  let previewMenu = document.querySelector('#previewMenu');

  const dNone = idFont.querySelector('.d-none');
  let divSelected = divBody.querySelector('.d-block');

  // Mostrar el tilde actual
  dNone.className += ' d-block';
  dNone.classList.remove('d-none');

  // Borrar el tilde anterior
  divSelected.classList.remove('d-block');
  divSelected.className += ' d-none';

  // Cambiar la font de la preview.
  previewMenu.style.fontFamily = newFont;
  previewCard.style.fontFamily = newFont;
}
