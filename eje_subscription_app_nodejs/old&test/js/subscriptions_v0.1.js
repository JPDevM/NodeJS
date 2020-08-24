// Guardo el elemento HTML donde voy a crear la lista de elementos. productList.
// Paso los parámetros junto con el parent por función (addSub) y los implemento en el código HTML guardandolo en la variable newSub. Imprimo desde la función el HTML en el parent.
// function addSub(parent, var1, var2) {
//   let newSub = `<html>${var1}</html>`;
//   parent.insertAdjacentHTML('beforeend', newSub);
// };

// Me conecto a la Base de datos mediante API con GET, capturo los resultados en Data y los guardo en allSubscription.
// fetch('assets/js/data.json')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     let allSubscriptions = data.subscriptions;
//   });

// Con un for invoco la función addSub pasandole el padre y sus parámetros. Utilizo un filtro if(active).

const productsList = document.querySelector('#mySubscriptions');
console.log(productsList);

// Insert una subscription
function addSub(parent, name, colorhexa, logoicon, description, price, days) {
  let newSub = `
    <li id="card" class="my-2">
      <a href="">
        <div style="background-color:#${colorhexa}; border-radius: 0.2em;">
          <div class="row" style="color: white">
            <div class="col-2">
              <i class="fa ${
                logoicon || 'fa-spotify'
              } m-2" style="font-size: 2em;"></i>
            </div>
            <div class="col-6">
              <div class="row">
                <p class="m-0"><strong>${name}</strong></p>
              </div>
              <div class="row">
                <p class="m-0"><small>
                  ${description || ''}</small>
                </p>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <p class="text-right m-0"><strong>${
                  price || '0.00'
                }€</strong></p>
              </div>
              <div class="row">
                <p class="text-right m-0">${days}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  `;

  parent.insertAdjacentHTML('beforeend', newSub);
}

// Consume API's
fetch('assets/js/data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let allSubscriptions = data.subscriptions;

    for (let i = 0; i < 20; i++) {
      if (allSubscriptions[i].active == 'yes') {
        addSub(
          productsList,
          allSubscriptions[i].name,
          allSubscriptions[i].colorhexa,
          allSubscriptions[i].logoicon,
          allSubscriptions[i].description,
          allSubscriptions[i].price,
          '2 días'
        );
      }
    }
  });
