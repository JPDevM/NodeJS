const currencyTable = document.querySelector('#currencyTable');
const result1 = document.querySelector('#eje1');

// Consume API's
fetch('assets/js/currency.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let allCurrencies = data.pop(); // La DB viene con solo un valor, lo extraigo. push() y pop() nos permiten agregar y eliminar al final del Array, mientras que unshift() y shift() lo hacen al inicio.
    let actualizationDate = allCurrencies.Date; // Extraigo la fecha
    delete allCurrencies.Date; // La borro del array

    for (let currency in allCurrencies) {
      // for in. Se usa para recorrer objetos literales

      // Guardo las variables en un nuevo objeto
      let finalData = {
        code: currency,
        value: allCurrencies[currency],
        actualization: actualizationDate,
      };

      addCurrency(currencyTable, finalData);

      // Add ALL Currencys for eje1 & eje2
      problem1(result1, finalData);
    }
  });

// Insert a values of currency.json in a table
function addCurrency(parent, data) {
  try {
    let newCurrency = `
      <tr>
        <th scope="row">€</th>
        <td>${data.code}</td>
        <td>${data.value}</td>
        <td>${data.actualization}</td>
      </tr>
    `;

    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', newCurrency);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

// Problem 1
function problem1(parent, data) {
  try {
    let resultado1 = `<p class="text-warning">resultado 1 - ${data.code}</p>`;

    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', resultado1);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

/* For of: recorre un array.
let colors = ['Yellow', 'Black', 'Pink', 'Blue'];

for (const oneColor of colors) {
  console.log(oneColor);
}

For in: recorre un objetos literal.
let car = {
  brand: 'Renault',
  model: 'Megane',
  year: 2020,
};

for (const prop in car) {
  console.log(`My car: ${prop} - ${car[prop]}`);
}
*/
