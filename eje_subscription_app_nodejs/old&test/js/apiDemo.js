// Apis recomendadas para practicar --> testApi.html
/*
	• https://restcountries.eu/
	• https://developers.themoviedb.org/3
	• https://estadisticasbcra.com/api/documentacion
  • https://developer.twitter.com/en/docs
  • https://www.udemy.com/developers/affiliate/ No pude Crear un cliente API de afiliado. :(
*/

/* TheMovieDB.org */
let moviesContainer = document.querySelector('#movies');
let endPoint =
  'https://api.themoviedb.org/3/discover/movie?api_key=8f2a16d4f0d2593718febacdf7b1d495&language=es-ES&page=3';

fetch(endPoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    let movies = info.results;
    movies.forEach(function (oneMovie) {
      let htmlStructure = `
			<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-5 text-center">
				<h4 class="text-truncate">${oneMovie.title}</h4>
				<img src="https://image.tmdb.org/t/p/w500${oneMovie.poster_path}" width="200"/>
				<p class="text-truncate font-weight-lighter">${
          oneMovie.overview ? oneMovie.overview : 'Sin descripción'
        }</p>
			</div>
		`;

      moviesContainer.insertAdjacentHTML('beforeend', htmlStructure);
    });
  });

// let movies = fetch(endPoint).then(function (response) { return response.json() });

/* 
		Banco Central de la República Argentina BCRA
 */

// let bcra = document.querySelector('#bcra');

let myHeadersBCRA = new Headers();
myHeadersBCRA.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjg1ODkzMzEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJkZXZlY2NoaUBleHhvLmVzIn0.BJW-uvSt9VX_Iz8XCq83jHXGFW90B2-wBmK1UlbzuJaELAgDZKaNwtxEzJJC_apk_Ujd_A_STjJc9D2bsQRm7A'
);

fetch('http://api.estadisticasbcra.com/usd_of', {
  headers: myHeadersBCRA,
  redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(results);
  })
  .catch((error) => console.log('error', error));

/* 
    Rest Countries 
*/
let countriesContainer = document.querySelector('#countries');
let endPointCurrency = 'https://restcountries.eu/rest/v2/all';

let currenciesData = [];

fetch(endPointCurrency)
  .then(function (response) {
    return response.json();
  })
  .then(function (countries) {
    countries.forEach(function (country) {
      currenciesData.push({
        name: country.name,
        currencyCode: country.currencies[0].code,
        currencySymbol: country.currencies[0].symbol,
      });
    });

    currenciesData.forEach(function (oneCurrency) {
      let htmlStructure = `
			<div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
				<p>${oneCurrency.name}, <spam class="font-weight-lighter">${oneCurrency.currencyCode} (${oneCurrency.currencySymbol})</spam></p>
			</div>
		`;

      countriesContainer.insertAdjacentHTML('beforeend', htmlStructure);
    });
  });

/* 
    Twitter 
    Un ben material explicado: https://www.dataneb.com/post/how-to-make-calls-to-twitter-apis-using-postman-client
*/
let twitterContainer = document.querySelector('#twitter');
var myHeadersTwitter = new Headers();

myHeadersTwitter.append(
  'Authorization',
  'OAuth oauth_consumer_key="7vFtp55sae0GUMTBwKNmE0lDX",oauth_token="312146098-3YSSL6x93hxffAg4E75XZNxIdlKk56OHnYDOLdNL",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1597661908",oauth_nonce="u6nR3E00ivV",oauth_version="1.0",oauth_signature="crQQLxLY9Q6V3Nk%2BJUMEb0yDyT4%3D"'
);
myHeadersTwitter.append(
  'Cookie',
  'personalization_id="v1_BvBJmEuYE55hc8mq5rURgg=="; guest_id=v1%3A159753184933804822; lang=es'
);

var requestOptions = {
  method: 'GET',
  headers: myHeadersTwitter,
  redirect: 'follow',
};

fetch(
  'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=JPDevM',
  requestOptions
)
  .then(function (response) {
    return response.json();
  })
  .then(function (info) {
    let twit = info.results;
    twit.forEach(function (oneTwit) {
      let htmlStructure = `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-5 text-center">
      <h4>Twitter de @JPDevM</h4>  
      <p class="text-truncate">${oneTwit.text}</p>
    </div>
  `;
      twitterContainer.insertAdjacentHTML('beforeend', htmlStructure);
    });
  })
  .catch((error) => console.log('error', error));
