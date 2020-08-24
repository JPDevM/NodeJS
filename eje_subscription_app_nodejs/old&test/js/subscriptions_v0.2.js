// Guardo los elementos HTML donde voy a crear las listas de elementos. allSubsList, mySubsList, popSubsList.
// Paso los parámetros junto con el parent por función (addSubWithPrice) y los implemento en el código HTML guardandolo en la variable newSubWithPrice. Verifico si existe el parent en el HTML , imprimo desde la función el HTML en el parent.
// La función addSub hace los mismo implementando la búsqueda del error con Try & Catch
//  function addSub(parent, var1, var2) {
//    try {
//      let newSub = `<html>${var1}</html>`;
//      if (parent !== null) {
//        parent.insertAdjacentHTML('beforeend', newSub);
//      }
//    } catch (error) {
//    throw new Error('Atentí que no vino el parent');
//  }

// Me conecto a la Base de datos mediante API con GET, capturo los resultados en Data y los guardo en allSubscription.
// Con un for invoco la función addSub pasandole el padre y sus parámetros. Utilizo un filtro if(active).

const allSubsList = document.querySelector('#allSubscriptions');
console.log(allSubsList);

const mySubsList = document.querySelector('#mySubscriptions');
console.log(mySubsList);

const popSubsList = document.querySelector('#popularSubscriptions');
console.log(popSubsList);

// Insert a subscription with price
function addSubWithPrice(
  parent,
  name,
  colorhexa,
  logoicon,
  description,
  price,
  days
) {
  let newSubWithPrice = `
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
                <p class="m-0"><small>${description || ''}</small>
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

  // Verifico si existe el parent en el HTML
  if (parent !== null) {
    parent.insertAdjacentHTML('beforeend', newSubWithPrice);
  }
}

// Insert a subscription without price
function addSub(parent, name, colorhexa, logoicon, active) {
  try {
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
                  <p class="m-0" style="line-height: 45px;"><strong>${name}</strong></p>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <p class="text-right m-0" style="line-height: 45px;">
                    <i class="fa ${
                      active ? 'fa-check' : 'fa-plus'
                    }" aria-hidden="true"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    `;

    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', newSub);
    }
  } catch (error) {
    throw new Error('Atentí que no vino el parent');
  }
}

// Consume API's
fetch('assets/js/data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let allSubscriptions = data.subscriptions;
    let activeSubscriptions = data.subscriptions;
    let popSubscriptions = data.subscriptions;

    console.log(allSubscriptions);

    for (let i = 0; i < 20; i++) {
      // Add ALL subsctiption
      addSub(
        allSubsList,
        allSubscriptions[i].name,
        allSubscriptions[i].colorhexa,
        allSubscriptions[i].logoicon,
        allSubscriptions[i].active
      );

      // Add only ACTIVE subscription
      if (activeSubscriptions[i].active) {
        addSubWithPrice(
          mySubsList,
          activeSubscriptions[i].name,
          activeSubscriptions[i].colorhexa,
          activeSubscriptions[i].logoicon,
          activeSubscriptions[i].description,
          activeSubscriptions[i].price,
          '2 días'
        );
      }

      // Add only POPULAR subscription
      if (popSubscriptions[i].active) {
        addSub(
          popSubsList,
          popSubscriptions[i].name,
          popSubscriptions[i].colorhexa,
          popSubscriptions[i].logoicon,
          popSubscriptions[i].active
        );
      }
    }
  });
