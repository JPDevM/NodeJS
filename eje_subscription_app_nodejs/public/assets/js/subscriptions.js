// coments
const mySubsList = document.querySelector('#mySubscriptions');
console.log(mySubsList);

const popSubsList = document.querySelector('#popularSubscriptions');
console.log(popSubsList);

const allSubsList = document.querySelector('#allSubscriptions');
console.log(allSubsList);

// Insert a subscription with price
function addSubWithPrice(parent, data) {
  try {
    let newSubWithPrice = `
      <li class="my-2">
        <a id="cardUser" href="">
          <div style="background-color:#${
            data.colorhexa
          }; border-radius: 0.2em;">
            <div id="cardRow" class="row mx-0">
            
              <div class="col-2">
                <i  id="cardLogo" 
                    class="fa ${data.logoicon || 'fa-spotify'} my-2">
                </i>
              </div>
            
              <div id="cardUserCenter" class="col-6">
                <div class="row">
                  <div class="col-12">
                    <p class="my-0 text-truncate">
                      <strong>${data.name}</strong>
                    </p>
                  </div>
                  <div class="col-12">
                    <p class="my-0 text-truncate">
                    <small>${data.description || ''}</small>
                    </p>
                  </div>
                </div>
              </div>
              
              <div id="cardUserRight" class="col">
                <div class="row">
                  <div class="col-12">
                    <p class="text-right my-0 text-truncate">
                      <strong>${data.price || '0.00'}€</strong>
                    </p>
                  </div>                  
                  <div class="col-12">
                    <p class="text-right my-0 text-truncate">${
                      data.days || ''
                    }</p>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </a>
      </li>
  `;

    if (parent !== null) {
      parent.insertAdjacentHTML('beforeend', newSubWithPrice);
    }
  } catch (error) {
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

// Insert a subscription without price
function addSub(parent, data) {
  try {
    let newSub = `
      <li class="my-2">
        <a id="cardDefault" href="">
          <div style="background-color:#${
            data.colorhexa
          }; border-radius: 0.2em;">
            <div id="cardRow" class="row mx-0 align-items-center">

              <div class="col-2">
                <i id="cardLogo" class="fa ${
                  data.logoicon || 'fa-spotify'
                } my-2"></i>
              </div>

              <div id="cardDefaultCenter" class="col-7">
                <p class="my-0 text-truncate"><strong>${data.name}</strong></p>
              </div>

              <div id="cardDefaultRight" class="col">
                <p class="text-right my-0">
                  <i class="fa ${
                    data.active ? 'fa-check' : 'fa-plus'
                  }" aria-hidden="true"></i>
                </p>
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
    throw new Error(
      'Does not load the parent. It may not be necessary in this HTML'
    );
  }
}

// Consume API's
fetch('assets/js/data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let activeSubscriptions = data.subscriptions;
    let popSubscriptions = data.subscriptions;
    let allSubscriptionsData = data.subscriptions;
    // console.log(allSubscriptionsData);

    for (let i = 0; i < allSubscriptionsData.length; i++) {
      // Add ACTIVE subscription
      if (activeSubscriptions[i].active) {
        addSubWithPrice(mySubsList, activeSubscriptions[i]);
      }

      // Add POPULAR subscriptions
      if (popSubscriptions[i].popular) {
        addSub(popSubsList, popSubscriptions[i]);
      }
      // Add ALL subsctiption
      addSub(allSubsList, allSubscriptionsData[i]);
    }
  });
