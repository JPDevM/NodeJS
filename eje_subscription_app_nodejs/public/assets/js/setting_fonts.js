// setting_font.html

let divBody = document.querySelector('body');
let containerFonts = document.querySelector('#containerFonts');

let previewCard = document.querySelector('#previewCard');
let previewMenu = document.querySelector('#previewMenu');

// SET Fonts
let arrFonts = [
  { name: 'Open Sans', id: 'fontOpenSans', check: 'd-block' },
  { name: 'Dancing Script', id: 'fontDancingScript', check: 'd-none' },
  { name: 'Indie Flower', id: 'fontIndieFlower', check: 'd-none' },
  { name: 'Nunito', id: 'fontNunito', check: 'd-none' },
  { name: 'Raleway', id: 'fontRaleway', check: 'd-none' },
  { name: 'Roboto Mono', id: 'fontRobotoMono', check: 'd-none' },
];

function addFonts(parent, arrFonts) {
  try {
    let newFont = `
    <div id="${arrFonts.id}" class="col-12 bg-dark-light border-setting-top" data-font="${arrFonts.name}">
      <div class="row align-items-center my-2">
        <div class="col-10 text-white text-truncate">
          <p class="my-0">${arrFonts.name}</p>
        </div>
        <div class="col-2 text-orange text-right">
          <i class="fa fa-check text-success ${arrFonts.check}" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    `;
    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', newFont);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

for (let font in arrFonts) {
  addFonts(containerFonts, arrFonts[font]);
}

// Edit Fonts
let fontsDivs = Array.from(containerFonts.querySelectorAll('div[id^=font]'));
let allCheckIcons = Array.from(containerFonts.querySelectorAll('.fa-check'));

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
