// setting_theme.html
// To-do: linea 65 terminar función que cambia el thema del preview

let divBody = document.querySelector('body');
let containerThemes = document.querySelector('#containerThemes');

let previewCard = document.querySelector('#previewCard');
let previewMenu = document.querySelector('#previewMenu');
let previewNavbar = document.querySelector('#previewNavbar');

// SET Fonts
let arrThemes = [
  { name: 'Clear', check: 'd-none', id: 'thmClear' },
  { name: 'Dark', check: 'd-block', id: 'thmDark' },
  { name: 'Flash', check: 'd-none', id: 'thmFlash' },
];

function addTheme(parent, arrThemes) {
  try {
    let newTheme = `
                    <div id="${arrThemes.id}" class="col-12 bg-dark-light border-setting-top">
                        <div class="row align-items-center my-2">
                          <div class=" col-10 text-white text-truncate">
                            <p class="my-0">${arrThemes.name}</p>
                          </div>
                          <div class="col-2 text-orange text-right">
                            <i class="fa fa-check text-success ${arrThemes.check}" aria-hidden="true"></i>
                          </div>
                        </div>
                    </div>
                   `;
    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', newTheme);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

for (let theme in arrThemes) {
  addTheme(containerThemes, arrThemes[theme]);
}

// Edit Themes
let themesDivs = Array.from(containerThemes.querySelectorAll('div[id^=thm]'));
let allCheckIcons = Array.from(containerThemes.querySelectorAll('.fa-check'));

function themeEdit(event) {
  let parent = event.currentTarget;
  let checkIcon = parent.querySelector('.fa-check');

  // Recorremos el array de allCheckIcons y les cambiamos las clases.
  allCheckIcons.forEach(function (oneCheckIcon) {
    oneCheckIcon.classList.remove('d-block');
    oneCheckIcon.classList.add('d-none');
  });

  // Mostramos el check al clickeado.
  if (!checkIcon.classList.contains('d-block')) {
    checkIcon.classList.add('d-block');
  }

  // Seteamos el theme en la preview
  // if (previewNavbar.classList.contains('navbar-dark'));
  // previewNavbar, previewCard, previewMenu;
  previewNavbar.classList.remove('navbar-dark');
  previewNavbar.classList.remove('bg-dark');
  previewNavbar.classList.add('navbar-light');
  previewNavbar.classList.add('bg-light');
}

// La funcien escucha cada vez que se hace un evento click en un div que contiene tod la estructura de la font.
themesDivs.forEach(function (oneDiv) {
  oneDiv.addEventListener('click', themeEdit);
});
