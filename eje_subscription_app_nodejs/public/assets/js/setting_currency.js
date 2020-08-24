// setting_currency.html

let divBody = document.querySelector('body');
let containerCurrencys = document.querySelector('#containerCurrencys');
let arrCurrencys = [];

// Consume API's
fetch('assets/js/currency.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let allCurrencies = data.pop();
    let actualizationDate = allCurrencies.Date;
    delete allCurrencies.Date;

    let currenciesArray = [];

    for (let currency in allCurrencies) {
      if (currency !== '') {
        // Guardo las variables en un nuevo objeto
        let crrncyId = 'crrncy';
        crrncyId = crrncyId.concat(currency);
  
        let finalCurrency = {
          code: currency,
          id: crrncyId,
          symbol: ' ',
          value: allCurrencies[currency],
          actualization: actualizationDate,
          check: 'd-none',
        };

        currenciesArray.push(finalCurrency);
      }
    }

    // 1. Creamos el objeto del currency actual
    let actualCurrency = {
      code: 'EUR',
      id: 'crrncyEUR',
      symbol: '€',
      value: 1,
      actualization: actualizationDate,
      check: 'd-none',
    }

    // 1.a. Insertamos el currency actual en el parent
    addCurrency(containerCurrencys, actualCurrency, 'afterbegin');

    // 2. Insertamos el <h1>
    containerCurrencys.insertAdjacentHTML('afterbegin', `<h4 style="color:salmon">Tenemos ${currenciesArray.length} monedas</h4>`);

    // 3. En el parent insertamos el resto de currencies
    currenciesArray.forEach(function (oneCurrency) {
      addCurrency(containerCurrencys, oneCurrency, 'beforeend');
    });
  });

function addCurrency(parent, currency, insertPlace) {
  try {
    let newCurrency = `
      <div id="${currency.id}" class="col-12 bg-dark-light border-setting-top">
          <div class="row align-items-center my-2">
            <div class=" col-10 text-white text-truncate">
              <p class="my-0">${currency.code} (${currency.symbol}) - ${currency.value}</p>
            </div>
            <div class="col-2 text-orange text-right">
              <i class="fa fa-check text-success ${currency.check}" aria-hidden="true"></i>
            </div>
          </div>
      </div>
    `;
    if (parent !== null) {
      parent.insertAdjacentHTML(insertPlace, newCurrency);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

// for (let currency in arrCurrencys) {
//   addCurrency(containerCurrencys, arrCurrencys[currency]);
// }

// Edit Currencys
let currencysDivs = Array.from(
  containerCurrencys.querySelectorAll('div[id^=crrncy]')
);
let allCheckIcons = Array.from(
  containerCurrencys.querySelectorAll('.fa-check')
);

function currencyEdit(event) {
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
}

// La funcien escucha cada vez que se hace un evento click en un div que contiene tod la estructura de la font.
currencysDivs.forEach(function (oneDiv) {
  oneDiv.addEventListener('click', currencyEdit);
});
