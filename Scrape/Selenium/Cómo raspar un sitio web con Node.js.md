#### Tutorial: [Fuente](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-with-node-js)

# Cómo raspar un sitio web con Node.js

[Nodo.js](https://www-digitalocean-com.translate.goog/community/tags/node-js?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es)

- ​          ![avatar predeterminado](https://images.prismic.io/digitalocean/46f22fba-7718-478b-86ae-e8b875f0473e_default-avatar.png?auto=compress,format)         

- PorMe alegro de china
- Publicado el 12 de diciembre de 2019

### Introducción

El raspado web es la técnica de extracción de datos de sitios web. Estos datos pueden almacenarse además en una base de datos o en cualquier  otro sistema de almacenamiento para su análisis u otros usos. Si bien la extracción de datos de los sitios web se puede realizar  manualmente, el web scraping generalmente se refiere a un proceso  automatizado.

La mayoría de los bots y rastreadores web utilizan el web scraping para la extracción de datos. Existen varias metodologías y herramientas que puede usar para el web scraping, y en este tutorial, nos centraremos en el uso de una técnica que  involucra el análisis DOM de una página web.

## requisitos previos

El raspado web se puede realizar en prácticamente cualquier lenguaje de programación que tenga soporte para `HTTP`y `XML`/o `DOM`análisis. En este tutorial, nos centraremos en el web scraping usando JavaScript en un entorno de servidor Node.js.

Con eso en mente, este tutorial asume que los lectores saben lo siguiente:

- Comprensión de la sintaxis de JavaScript y ES6 y ES7
- Familiaridad con jQuery
- Conceptos de programación funcional

A continuación, repasaremos cuál será nuestro proyecto final.

## Especificaciones del proyecto

Usaremos web scraping para extraer algunos datos del sitio web de [Scotch](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://scotch.io/) . Scotch no proporciona una API para obtener los perfiles y tutoriales/publicaciones de los autores. Por lo tanto, crearemos una API para obtener los perfiles y tutoriales/publicaciones de los autores escoceses.

Aquí hay una captura de pantalla de una aplicación de demostración creada en base a la API que construiremos en este tutorial.

![Captura de pantalla de la aplicación de demostración](https://assets.digitalocean.com/articles/how-to-scrape-a-website-with-node-js/h2b36kv.png)

Antes de comenzar, repasemos los paquetes y las dependencias que necesitará para completar este proyecto.

## Configuración del proyecto

Antes de comenzar, asegúrese de tener Node y `npm`/o `yarn`instalado en su máquina. Dado que usaremos mucha sintaxis de ES6/7 en este tutorial, se recomienda  que use las siguientes versiones de Node y npm para una compatibilidad  completa con ES6/7: Node `8.9.0`o superior y npm `5.2.0`o superior.

Usaremos los siguientes paquetes básicos:

1. [Cheerio](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://cheerio.js.org/) : Cheerio es una implementación rápida, flexible y sencilla de [jQuery](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=http://jquery.com/) central diseñada específicamente para el servidor. Hace que el análisis de DOM sea muy fácil.
2. [Axios](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://github.com/axios/axios) : Axios es un cliente HTTP basado en promesas para el navegador y Node.js. Nos permitirá obtener el contenido de la página a través de solicitudes HTTP.
3. [Express](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://expressjs.com/) : Express es un marco de aplicación web de Node.js mínimo y flexible  que proporciona un conjunto sólido de funciones para aplicaciones web y  móviles.
4. [Lodash](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://lodash.com/) : Lodash es una moderna biblioteca de utilidades de JavaScript que ofrece modularidad, rendimiento y extras. Hace que JavaScript sea más fácil al eliminar la molestia de trabajar con matrices, números, objetos, cadenas, etc.

## Paso 1: crear el directorio de aplicaciones

Cree un nuevo directorio para la aplicación y ejecute el siguiente comando  para instalar las dependencias requeridas para la aplicación.

```bash
          mkdir scotch-scraping 
         
```

Cambiar al nuevo directorio:

```bash
          cd scotch-scraping 
         
```

Iniciar un nuevo paquete:

```
npm init -y
```

E instale las dependencias de la aplicación:

```bash
          npm install express morgan axios cheerio lodash 
         
```

## Paso 2: configurar la aplicación Express Server

Seguiremos adelante para configurar una aplicación de servidor HTTP usando Express. Cree un `server.js`archivo en el directorio raíz de su aplicación y agregue el siguiente fragmento de código para configurar el servidor:

​        servidor.js       

```javascript
// Require dependencies
const logger = require('morgan');
const express = require('express');

// Create an Express application
const app = express();

// Configure the app port
const port = process.env.PORT || 3000;
app.set('port', port);

// Load middlewares
app.use(logger('dev'));

// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}.`));
```

## Paso 3: modificar npm`scripts`

Finalmente, modificaremos la `"scripts"`sección del `package.json`archivo para que se vea como el siguiente fragmento:

​        paquete.json       

```json
"scripts": {
  "start": "node server.js"
}
```

Hemos obtenido todo lo que necesitamos para comenzar a construir nuestra aplicación. Si ejecuta el comando `npm start`en su terminal ahora, iniciará el servidor de aplicaciones en el puerto `3000`si está disponible. Sin embargo, todavía no podemos acceder a ninguna ruta ya que aún tenemos que agregar rutas a nuestra aplicación. Comencemos a crear algunas funciones auxiliares que necesitaremos para el web scraping.

## Paso 4: crear funciones auxiliares

Como se indicó anteriormente, crearemos un par de funciones auxiliares que  se utilizarán en varias partes de nuestra aplicación. Cree un nuevo `app`directorio en la raíz de su proyecto. Cree un nuevo archivo con el nombre `helpers.js`en el directorio que acaba de crear y agréguele el siguiente contenido:

​        aplicación/ayudantes.js       

```javascript
const _ = require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");
```

En este código, requerimos las dependencias que necesitaremos para nuestras funciones auxiliares. Avancemos y agreguemos las funciones auxiliares.

### Creación de funciones auxiliares de utilidad

Comenzaremos creando algunas funciones auxiliares de utilidad. Agregue el siguiente fragmento de código al `app/helpers.js`archivo.

​        aplicación/ayudantes.js       

```javascript
///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/* * Compose function arguments starting from right to left * to an overall function and returns the overall function */
const compose = (...fns) => arg => {
  return **_.flattenDeep(fns).reduceRight((current, fn) => {
    if (_**.isFunction(fn)) return fn(current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/* * Compose async function arguments starting from right to left * to an overall async function and returns the overall async function */
const composeAsync = (...fns) => arg => {
  return .flattenDeep(fns).reduceRight(async (current, fn) => {
    if (.isFunction(fn)) return fn(await current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/* * Enforces the scheme of the URL is https * and returns the new URL */
const enforceHttpsUrl = url =>
  _.isString(url) ? url.replace(/^(https?:)?\/\//, "https://") : null;

/* * Strips number of all non-numeric characters * and returns the sanitized number */
const sanitizeNumber = number =>
  _.isString(number)
    ? number.replace(/[^0-9-.]/g, "")
    : _.isNumber(number) ? number : null;

/* * Filters null values from array * and returns an array without nulls */
const withoutNulls = arr =>
  _.isArray(arr) ? arr.filter(val => !_.isNull(val)) : _[_];

/* * Transforms an array of ({ key: value }) pairs to an object * and returns the transformed object */
const arrayPairsToObject = arr =>
  arr.reduce((obj, pair) => ({ ...obj, ...pair }), {});

/* * A composed function that removes null values from array of ({ key: value }) pairs * and returns the transformed object of the array */
const fromPairsToObject = compose(arrayPairsToObject, withoutNulls);
```

Repasemos las funciones una a la vez para entender lo que hacen.

- `compose()`- Esta es una función de orden superior que toma una o más funciones como argumentos y devuelve un `composed function`. La función compuesta tiene el mismo efecto que invocar las funciones  pasadas como argumentos de derecha a izquierda, pasando el resultado de  la invocación de una función como argumento a la siguiente función cada  vez. Si alguno de los argumentos pasados `compose()`no es un `function`, la función compuesta generará un error cada vez que se invoque. Aquí hay un fragmento de código que describe cómo `compose()`funciona.

```javascript
/* * ------------------------------------------------- * Method 1: Functions in sequence * ------------------------------------------------- */
function1( function2( function3(arg) ) );

/* * ------------------------------------------------- * Method 2: Using compose() * ------------------------------------------------- * Invoking the composed function has the same effect as (Method 1) */
const composedFunction = compose(function1, function2, function3);

composedFunction(arg);
```

- `composeAsync()`- Esta función funciona de la misma manera que la `compose()`función. La única diferencia es que es asíncrono. Por lo tanto, es ideal para componer funciones que tienen un comportamiento asíncrono, por ejemplo, funciones que devuelven promesas.
- `enforceHttpsUrl()`- Esta función toma una `url`cadena como argumento y devuelve la URL con el `https`esquema siempre que `url`comience con `https://`, `http://`o `//`. Si `url`no es una cadena, `null`se devuelve. Aquí hay un ejemplo.

```javascript
enforceHttpsUrl('scotch.io'); // returns => 'scotch.io'
enforceHttpsUrl('//scotch.io'); // returns => 'https://scotch.io'
enforceHttpsUrl('http://scotch.io'); // returns => 'https://scotch.io'
```

- `sanitizeNumber()`- Esta función espera un `number`o `string`como argumento. Si `number`se le pasa a, devuelve el número. Sin embargo, si `string`se le pasa un, elimina los caracteres no numéricos de la cadena y devuelve la cadena desinfectada. Para otros tipos de valores, devuelve `null`. Aquí hay un ejemplo:

```javascript
sanitizeNumber(53.56); // returns => 53.56
sanitizeNumber('-2oo,40'); // returns => '-240'
sanitizeNumber('badnumber.decimal'); // returns => '.'
```

- `withoutNulls()`- Esta función espera an `array`como argumento y devuelve una nueva matriz que solo contiene los `non-null`elementos de la matriz original. Aquí hay un ejemplo.

```javascript
withoutNulls([ 'String', [], null, {}, null, 54 ]); // returns => ['String', [], {}, 54]
```

- `arrayPairsToObject()`- Esta función espera un objeto `array`de ( `{ key: value }`) y devuelve un objeto transformado con las claves y los valores. Aquí hay un ejemplo.

```javascript
const pairs = [ { key1: 'value1' }, { key2: 'value2' }, { key3: 'value3' } ];

arrayPairsToObject(pairs); // returns => { key1: 'value1', key2: 'value2', key3: 'value3' }
```

- `fromPairsToObject()`- Esta es una función compuesta creada usando `compose()`. Tiene el mismo efecto que ejecutar:

```javascript
arrayPairsToObject( withoutNulls(array) );
```

### Funciones auxiliares de solicitud y respuesta

Agregue lo siguiente al `app/helpers.js`archivo.

​        aplicación/ayudantes.js       

```javascript
/* * Handles the request(Promise) when it is fulfilled * and sends a JSON response to the HTTP response stream(res). */
const sendResponse = res => async request => {
  return await request
    .then(data => res.json({ status: "success", data }))
    .catch(({ status: code = 500 }) =>
      res.status(code).json({ status: "failure", code, message: code == 404 ? 'Not found.' : 'Request failed.' })
    );
};

/* * Loads the html string returned for the given URL * and sends a Cheerio parser instance of the loaded HTML */
const fetchHtmlFromUrl = async url => {
  return await axios
    .get(enforceHttpsUrl(url))
    .then(response => cheerio.load(response.data))
    .catch(error => {
      error.status = (error.response && error.response.status) || 500;
      throw error;
    });
};
```

Aquí, hemos agregado dos nuevas funciones: `sendResponse()`y `fetchHtmlFromUrl()`. Tratemos de entender lo que hacen.

- `sendResponse()`- Esta es una función de orden superior que espera un flujo de respuesta Express HTTP ( `res`) como argumento y devuelve un `async function`. El devuelto `async function`espera a `promise`o a `thenable`como su argumento ( `request`). Si la `request`promesa se resuelve, se envía una respuesta JSON correcta mediante `res.json()`, que contiene los datos resueltos. Si la promesa se rechaza, se envía una respuesta JSON de error con un código de estado HTTP apropiado. Así es como se puede utilizar en una ruta Express:

```javascript
app.get('/path', (req, res, next) => {
  const request = Promise.resolve([1, 2, 3, 4, 5]);
  sendResponse(res)(request);
});
```

Hacer una `GET`solicitud al `/path`punto final devolverá esta respuesta JSON:

```json
{
  "status": "success",
  "data": [1, 2, 3, 4, 5]
}
```

- `fetchHtmlFromUrl()`- Este es un `async function`que espera una `url`cadena como argumento. Primero, se utiliza `axios.get()`para obtener el contenido de la URL (que devuelve una promesa). Si la promesa se resuelve, se usa `cheerio.load()`con el contenido devuelto para crear una instancia de analizador de Cheerio y luego devuelve la instancia. Sin embargo, si la promesa se rechaza, arroja un error con un código de estado apropiado. La instancia del analizador Cheerio que devuelve esta función nos permitirá extraer los datos que necesitamos. Podemos usarlo de manera muy similar a como usamos la instancia jQuery devuelta al llamar `$()`o `jQuery()`en un objetivo DOM.

### Funciones auxiliares de análisis de DOM

Agreguemos algunas funciones adicionales para ayudarnos con el análisis DOM. Agregue el siguiente contenido al `app/helpers.js`archivo.

​        aplicación/ayudantes.js       

```javascript
///////////////////////////////////////////////////////////////////////////////
// HTML PARSING HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/* * Fetches the inner text of the element * and returns the trimmed text */
const fetchElemInnerText = elem => (elem.text && elem.text().trim()) || null;

/* * Fetches the specified attribute from the element * and returns the attribute value */
const fetchElemAttribute = attribute => elem =>
  (elem.attr && elem.attr(attribute)) || null;

/* * Extract an array of values from a collection of elements * using the extractor function and returns the array * or the return value from calling transform() on array */
const extractFromElems = extractor => transform => elems => $ => {
  const results = elems.map((i, element) => extractor($(element))).get();
  return _.isFunction(transform) ? transform(results) : results;
};

/* * A composed function that extracts number text from an element, * sanitizes the number text and returns the parsed integer */
const extractNumber = compose(parseInt, sanitizeNumber, fetchElemInnerText);

/* * A composed function that extracts url string from the element's attribute(attr) * and returns the url with https scheme */
const extractUrlAttribute = attr =>
  compose(enforceHttpsUrl, fetchElemAttribute(attr));

module.exports = {
  compose,
  composeAsync,
  enforceHttpsUrl,
  sanitizeNumber,
  withoutNulls,
  arrayPairsToObject,
  fromPairsToObject,
  sendResponse,
  fetchHtmlFromUrl,
  fetchElemInnerText,
  fetchElemAttribute,
  extractFromElems,
  extractNumber,
  extractUrlAttribute
};
```

Hemos añadido algunas funciones más. Aquí están las funciones y lo que hacen:

- `fetchElemInnerText()`- Esta función espera un `element`argumento as. Extrae el `innerText`del elemento llamando `elem.text()`, recorta el texto de los espacios en blanco circundantes y devuelve el texto interno recortado. Aquí hay un ejemplo.

```javascript
const $ = cheerio.load('<div class="fullname"> Glad Chinda </div>');
const elem = $('div.fullname');

fetchElemInnerText(elem); // returns => 'Glad Chinda'
```

- `fetchElemAttribute()`- Esta es una función de orden superior que espera un `attribute`argumento as y devuelve otra función que espera un `element`argumento as. La función devuelta extrae el valor de lo dado `attribute`del elemento llamando a `elem.attr(attribute)`. Aquí hay un ejemplo.

```javascript
const $ = cheerio.load('<div class="username" title="Glad Chinda">@gladchinda</div>');
const elem = $('div.username');

// fetchTitle is a function that expects an element as argument
const fetchTitle = fetchElemAttribute('title');

fetchTitle(elem); // returns => 'Glad Chinda'
```

- `extractFromElems()`- Esta es una función de orden superior que devuelve otra función de orden superior. Aquí, hemos utilizado una técnica de programación funcional conocida como [curry](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://en.wikipedia.org/wiki/Currying) para crear una secuencia de funciones, cada una de las cuales requiere solo un argumento. Aquí está la secuencia de argumentos:

```
extractorFunction -> transformFunction -> elementsCollection -> cheerioInstance
```

`extractFromElems()`hace posible extraer datos de una colección de elementos similares usando una `extractor`función, y también transformar los datos extraídos usando una `transform`función. La `extractor`función recibe un elemento como argumento, mientras que la `transform`función recibe una matriz de valores como argumento. Digamos que tenemos una colección de elementos, cada uno de los cuales contiene el nombre de una persona como `innerText`. Queremos extraer todos estos nombres y devolverlos en una matriz, todo en mayúsculas. Así es como podemos hacer esto usando `extractFromElems()`:

```javascript
const $ = cheerio.load('<div class="people"><span>Glad Chinda</span><span>John Doe</span><span>Brendan Eich</span></div>');

// Get the collection of span elements containing names
const elems = $('div.people span');

// The transform function
const transformUpperCase = values => values.map(val => String(val).toUpperCase());

// The arguments sequence: extractorFn => transformFn => elemsCollection => cheerioInstance($)
// fetchElemInnerText is used as extractor function
const extractNames = extractFromElems(fetchElemInnerText)(transformUpperCase)(elems);

// Finally pass in the cheerioInstance($)
extractNames($); // returns => ['GLAD CHINDA', 'JOHN DOE', 'BRENDAN EICH']
```

- `extractNumber()`- Esta es una función compuesta que espera un `element`argumento e intenta extraer un número del `innerText`elemento. Lo hace componiendo `parseInt()`, `sanitizeNumber()`y `fetchElemInnerText()`. Tiene el mismo efecto que ejecutar:

```javascript
parseInt( sanitizeNumber( fetchElemInnerText(elem) ) );
```

- `extractUrlAttribute()`- Esta es una función compuesta de orden superior que espera un `attribute`argumento as y devuelve otra función que espera un `element`argumento as. La función devuelta intenta extraer el valor de URL de un atributo en el elemento y lo devuelve con el `https`esquema. Aquí hay un fragmento que muestra cómo funciona:

```javascript
// METHOD 1
const fetchAttribute = fetchElemAttribute(attr);
enforceHttpsUrl( fetchAttribute(elem) );

// METHOD 2: Using extractUrlAttribute()
const fetchUrlAttribute = extractUrlAttribute(attr);
fetchUrlAttribute(elem);
```

Finalmente, exportamos todas las funciones de ayuda que hemos creado usando `module.exports`. Ahora que tenemos nuestras funciones auxiliares, podemos continuar con la parte de web scraping de este tutorial.

## Paso 5: configure el raspado llamando a la URL

Cree un nuevo archivo con el nombre `scotch.js`en el `app`directorio de su proyecto y agréguele el siguiente contenido:

​        aplicación/escocés.js       

```javascript
const _ = require('lodash');

// Import helper functions
const {
  compose,
  composeAsync,
  extractNumber,
  enforceHttpsUrl,
  fetchHtmlFromUrl,
  extractFromElems,
  fromPairsToObject,
  fetchElemInnerText,
  fetchElemAttribute,
  extractUrlAttribute
} = require("./helpers");

// scotch.io (Base URL)
const SCOTCH_BASE = "https://scotch.io";

///////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/* * Resolves the url as relative to the base scotch url * and returns the full URL */
const scotchRelativeUrl = url =>
  _.isString(url) ? `${SCOTCH_BASE}${url.replace(/^\/*?/, "/")}` : null;

/* * A composed function that extracts a url from element attribute, * resolves it to the Scotch base url and returns the url with https */
const extractScotchUrlAttribute = attr =>
  compose(enforceHttpsUrl, scotchRelativeUrl, fetchElemAttribute(attr));
```

Como puede ver, `lodash`también importamos algunas de las funciones auxiliares que creamos anteriormente. También definimos un nombre constante `SCOTCH_BASE`que contiene la URL base del sitio web de Scotch. Finalmente, agregamos dos funciones auxiliares:

- `scotchRelativeUrl()`- Esta función toma una cadena relativa `url`como argumento y devuelve la URL con el preconfigurado `SCOTCH_BASE`antepuesto. Si `url`no es una cadena, `null`se devuelve. Aquí hay un ejemplo.

```javascript
scotchRelativeUrl('tutorials'); // returns => 'https://scotch.io/tutorials'
scotchRelativeUrl('//tutorials'); // returns => 'https://scotch.io///tutorials'
scotchRelativeUrl('http://domain.com'); // returns => 'https://scotch.io/http://domain.com'
```

- `extractScotchUrlAttribute()`- Esta es una función compuesta de orden superior que espera un `attribute`argumento as y devuelve otra función que espera un `element`argumento as. La función devuelta intenta extraer el valor de URL de un atributo en el elemento, antepone lo preconfigurado `SCOTCH_BASE`y lo devuelve con el `https`esquema. Aquí hay un fragmento que muestra cómo funciona:

```javascript
// METHOD 1
const fetchAttribute = fetchElemAttribute(attr);
enforceHttpsUrl( scotchRelativeUrl( fetchAttribute(elem) ) );

// METHOD 2: Using extractScotchUrlAttribute()
const fetchUrlAttribute = extractScotchUrlAttribute(attr);
fetchUrlAttribute(elem);
```

## Paso 6: Usar funciones de extracción

Queremos poder extraer los siguientes datos para cualquier autor escocés:

- **perfil** : (nombre, rol, avatar, etc.)
- **enlaces sociales** : (Facebook, Twitter, GitHub, etc.)
- **estadísticas** : (vistas totales, publicaciones totales, etc.)
- **publicaciones**

Si recuerda, la `extractFromElems()`función auxiliar que creamos anteriormente requiere una `extractor`función para extraer contenido de una colección de elementos similares. Vamos a definir algunas funciones extractoras en esta sección.

### Extracción de enlaces sociales

Primero, crearemos una `extractSocialUrl()`función para extraer el nombre de la red social y la URL de un elemento de enlace social `<a>`. Aquí está la estructura DOM del elemento de enlace social `<a>`esperado por `extractSocialUrl()`.

```markup
<a href="https://github.com/gladchinda" target="_blank" title="GitHub">
  <span class="icon icon-github">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="50" height="50" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      ...
    </svg>
  </span>
</a>
```

Llamar a la `extractSocialUrl()`función debería devolver un objeto similar al siguiente:

```javascript
{ github: 'https://github.com/gladchinda' }
```

Pasemos a crear la función. Agregue el siguiente contenido al `app/scotch.js`archivo.

​        aplicación/escocés.js       

```javascript
///////////////////////////////////////////////////////////////////////////////
// EXTRACTION FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/* * Extract a single social URL pair from container element */
const extractSocialUrl = elem => {

  // Find all social-icon <span> elements
  const icon = elem.find('span.icon');

  // Regex for social classes
  const regex = /^(?:icon|color)-(.+)$/;

  // Extracts only social classes from the class attribute
  const onlySocialClasses = regex => (classes = '') => classes
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter(classname => regex.test(classname));

  // Gets the social network name from a class name
  const getSocialFromClasses = regex => classes => {
    let social = null;
    const [classname = null] = classes;

    if (_.isString(classname)) {
      const _[_, name = null] = classname.match(regex);
      social = name ? _.snakeCase(name) : null;
    }

    return social;
  };

  // Extract the href URL from the element
  const href = extractUrlAttribute('href')(elem);

  // Get the social-network name using a composed function
  const social = compose(
    getSocialFromClasses(regex),
    onlySocialClasses(regex),
    fetchElemAttribute('class')
  )(icon);

  // Return an object of social-network-name(key) and social-link(value)
  // Else return null if no social-network-name was found
  return social && { [social]: href };

};
```

Tratemos de entender cómo funciona la `extractSocialUrl()`función:

1. Primero, buscamos el `<span>`elemento secundario con una `icon`clase. También definimos una expresión regular que coincide con los nombres de las clases de iconos sociales.
2. Definimos `onlySocialClasses()`una función de orden superior que toma una expresión regular como argumento y devuelve una función. La función devuelta toma una cadena de nombres de clase separados por espacios. Luego usa la expresión regular para extraer solo los nombres de las clases sociales de la lista y los devuelve en una matriz. Aquí hay un ejemplo:

```javascript
const regex = /^(?:icon|color)-(.+)$/;
const extractSocial = onlySocialClasses(regex);
const classNames = 'first-class another-class color-twitter icon-github';

extractSocial(classNames); // returns [ 'color-twitter', 'icon-github' ]
```

1. A continuación, definimos `getSocialFromClasses()`una función de orden superior que toma una expresión regular como argumento y devuelve una función. La función devuelta toma una matriz de cadenas de una sola clase. Luego usa la expresión regular para extraer el nombre de la red social de la primera clase en la lista y lo devuelve. Aquí hay un ejemplo:

```javascript
const regex = /^(?:icon|color)-(.+)$/;
const extractSocialName = getSocialFromClasses(regex);
const classNames = [ 'color-twitter', 'icon-github' ];

extractSocialName(classNames); // returns 'twitter'
```

1. Luego, extraemos la `href`URL del atributo del elemento. También extraemos el nombre de la red social del elemento del icono usando una función compuesta creada por `<span>`componer `getSocialFromClasses(regex)`y .`onlySocialClasses(regex)``fetchElemAttribute('class')`
2. Finalmente, devolvemos un objeto con el nombre de la red social como clave y la `href`URL como valor. Sin embargo, si no se obtuvo ninguna red social, se devuelve nulo. Aquí hay un ejemplo del objeto devuelto:

```javascript
{ twitter: 'https://twitter.com/gladchinda' }
```

### Extracción de publicaciones y estadísticas

Seguiremos adelante para crear dos funciones de extracción adicionales, a saber: `extractPost()`y `extractStat()`, para extraer publicaciones y estadísticas respectivamente. Antes de crear las funciones, echemos un vistazo a la estructura DOM de los elementos esperados por estas funciones.

Aquí está la estructura DOM del elemento esperado por `extractPost()`.

```markup
<div class="card large-card" data-type="post" data-id="2448">
  <a href="/tutorials/password-strength-meter-in-angularjs" class="card**img lazy-background" data-src="https://cdn.scotch.io/7540/iKZoyh9WSlSzB9Bt5MNK_post-cover-photo.jpg">
    <span class="tag is-info">Post</span>
  </a>
  <h2 class="card**title">
    <a href="/tutorials/password-strength-meter-in-angularjs">Password Strength Meter in AngularJS</a>
  </h2>
  <div class="card-footer">
    <a class="name" href="/@gladchinda">Glad Chinda</a>
    <a href="/tutorials/password-strength-meter-in-angularjs" title="Views">
      ?️ <span>24,280</span>
    </a>
    <a href="/tutorials/password-strength-meter-in-angularjs#comments-section" title="Comments">
      ? <span class="comment-number" data-id="2448">5</span>
    </a>
  </div>
</div>
```

Aquí está la estructura DOM del elemento esperado por `extractStat()`.

```markup
<div class="profile__stat column is-narrow">
  <div class="stat">41,454</div>
  <div class="label">Pageviews</div>
</div>
```

Agregue el siguiente contenido al `app/scotch.js`archivo.

​        aplicación/escocés.js       

```javascript
/* * Extract a single post from container element */
const extractPost = elem => {
  const title = elem.find('.card__title a');
  const image = elem.find('a**[**data-src]');
  const views = elem.find("a**[**title='Views'] span");
  const comments = elem.find("a**[**title='Comments'] span.comment-number");

  return {
    title: fetchElemInnerText(title),
    image: extractUrlAttribute('data-src')(image),
    url: extractScotchUrlAttribute('href')(title),
    views: extractNumber(views),
    comments: extractNumber(comments)
  };
};

/* * Extract a single stat from container element */
const extractStat = elem => {
  const statElem = elem.find(".stat")
  const labelElem = elem.find('.label');

  const lowercase = val => _.isString(val) ? val.toLowerCase() : null;

  const stat = extractNumber(statElem);
  const label = compose(lowercase, fetchElemInnerText)(labelElem);

  return { [label]: stat };
};
```

La `extractPost()`función extrae el título, la imagen, la URL, las vistas y los comentarios de  una publicación analizando los elementos secundarios del elemento dado. Utiliza un par de funciones auxiliares que creamos anteriormente para extraer datos de los elementos apropiados.

Este es un ejemplo del objeto devuelto al llamar a `extractPost()`.

```javascript
{
  title: "Password Strength Meter in AngularJS",
  image: "https://cdn.scotch.io/7540/iKZoyh9WSlSzB9Bt5MNK_post-cover-photo.jpg",
  url: "https://scotch.io//tutorials/password-strength-meter-in-angularjs",
  views: 24280,
  comments: 5
}
```

La `extractStat()`función extrae los datos estadísticos contenidos en el elemento dado. Este es un ejemplo del objeto devuelto al llamar a `extractStat()`.

```javascript
{ pageviews: 41454 }
```

## Paso 7: Extraer una página web específica

Ahora procederemos a definir la `extractAuthorProfile()`función que extrae el perfil completo del autor escocés. Agregue el siguiente contenido al `app/scotch.js`archivo.

​        aplicación/escocés.js       

```javascript
/* * Extract profile from a Scotch author's page using the Cheerio parser instance * and returns the author profile object */
const extractAuthorProfile = $ => {

  const mainSite = $('#sitemain');
  const metaScotch = $("meta**[**property='og:url']");
  const scotchHero = mainSite.find('section.hero--scotch');
  const superGrid = mainSite.find('section.super-grid');

  const authorTitle = scotchHero.find(".profilename h1.title");
  const profileRole = authorTitle.find(".tag");
  const profileAvatar = scotchHero.find("img.profileavatar");
  const profileStats = scotchHero.find(".profilestats .profilestat");
  const authorLinks = scotchHero.find(".author-links a**[**target='_blank']");
  const authorPosts = superGrid.find(".super-griditem **[**data-type='post']");

  const extractPosts = extractFromElems(extractPost)();
  const extractStats = extractFromElems(extractStat)(fromPairsToObject);
  const extractSocialUrls = extractFromElems(extractSocialUrl)(fromPairsToObject);

  return Promise.all(**[**
    fetchElemInnerText(authorTitle.contents().first()),
    fetchElemInnerText(profileRole),
    extractUrlAttribute('content')(metaScotch),
    extractUrlAttribute('src')(profileAvatar),
    extractSocialUrls(authorLinks)($),
    extractStats(profileStats)($),
    extractPosts(authorPosts)($)
  ]).then((**[** author, role, url, avatar, social, stats, posts ]) => ({ author, role, url, avatar, social, stats, posts }));

};

/* * Fetches the Scotch profile of the given author */
const fetchAuthorProfile = author => {
  const AUTHOR_URL = `${SCOTCH_BASE}/@${author.toLowerCase()}`;
  return composeAsync(extractAuthorProfile, fetchHtmlFromUrl)(AUTHOR_URL);
};

module.exports = { fetchAuthorProfile };
```

La `extractAuthorProfile()`función es muy sencilla. Primero usamos `$`(la instancia del analizador Cheerio) para encontrar un par de elementos y colecciones de elementos.

A continuación, usamos la `extractFromElems()`función auxiliar junto con las funciones extractoras que creamos anteriormente en esta sección ( `extractPost`, `extractStat`y `extractSocialUrl`) para crear funciones de extracción de orden superior. Observe cómo usamos la `fromPairsToObject`función auxiliar que creamos anteriormente como una función de transformación.

Finalmente, usamos `Promise.all()`para extraer todos los datos requeridos, aprovechando un par de funciones auxiliares que creamos anteriormente. Los datos extraídos están contenidos en una estructura de matriz siguiendo  esta secuencia: nombre del autor, función, enlace Scotch, enlace de  avatar, enlaces sociales, estadísticas y publicaciones.

Observe cómo usamos la desestructuración en el `.then()`controlador de promesas para construir el objeto final que se devuelve cuando se resuelven todas las promesas. El objeto devuelto debería tener el siguiente aspecto:

```javascript
{
  author: 'Glad Chinda',
  role: 'Author',
  url: 'https://scotch.io/@gladchinda',
  avatar: 'https://cdn.scotch.io/7540/EnhoZyJOQ2ez9kVhsS9B_profile.jpg',
  social: {
    twitter: 'https://twitter.com/gladchinda',
    github: 'https://github.com/gladchinda'
  },
  stats: {
    posts: 6,
    pageviews: 41454,
    readers: 31676
  },
  posts: [
    {
      title: 'Password Strength Meter in AngularJS',
      image: 'https://cdn.scotch.io/7540/iKZoyh9WSlSzB9Bt5MNK_post-cover-photo.jpg',
      url: 'https://scotch.io//tutorials/password-strength-meter-in-angularjs',
      views: 24280,
      comments: 5
    },
    ...
  ]
}
```

También definimos la `fetchAuthorProfile()`función que acepta el nombre de usuario Scotch de un autor y devuelve una Promesa que se resuelve en el perfil del autor. Para un autor cuyo nombre de usuario es `gladchinda`, la URL escocesa es `https://scotch.io/@gladchinda`.

`fetchAuthorProfile()`usa la `composeAsync()`función de ayuda para crear una función compuesta que primero obtiene el contenido DOM de la página Scotch del autor usando la `fetchHtmlFromUrl()`función de ayuda y finalmente extrae el perfil del autor usando la `extractAuthorProfile()`función que acabamos de crear.

Finalmente, exportamos `fetchAuthorProfile`como único identificador en el `module.exports`objeto.

## Paso 8: Cómo crear una ruta

Casi hemos terminado con nuestra API. Necesitamos agregar una ruta a nuestro servidor que nos permita obtener el perfil de cualquier autor escocés. La ruta tendrá la siguiente estructura, donde el `author`parámetro representa el nombre de usuario del autor escocés.

```http
GET /scotch/:author
```

Sigamos adelante y creemos esta ruta. Haremos un par de cambios en el `server.js`archivo. Primero, agregue lo siguiente al `server.js`archivo para requerir algunas de las funciones que necesitamos.

​        servidor.js       

```javascript
// Require the needed functions
const { sendResponse } = require('./app/helpers');
const { fetchAuthorProfile } = require('./app/scotch');
```

Finalmente, agregue la ruta al `server.js`archivo inmediatamente después del middleware.

​        servidor.js       

```javascript
// Add the Scotch author profile route
app.get('/scotch/:author', (req, res, next) => {
  const author = req.params.author;
  sendResponse(res)(fetchAuthorProfile(author));
});
```

Como puede ver, pasamos lo `author`recibido del parámetro de ruta a la `fetchAuthorProfile()`función para obtener el perfil del autor dado. Luego usamos el `sendResponse()`método auxiliar para enviar el perfil devuelto como una respuesta JSON.

Hemos construido con éxito nuestra API utilizando una técnica de web scraping. Continúe y pruebe la API ejecutando `npm start`el comando en su terminal. Inicie su herramienta de prueba HTTP favorita, por ejemplo, [Postman](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://www.getpostman.com/) , y pruebe el punto final de la API. Si siguió todos los pasos correctamente, debería tener un resultado similar a la siguiente demostración:

## Conclusión

En este tutorial, hemos visto cómo podemos emplear técnicas [de web scraping](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://en.wikipedia.org/wiki/Web_scraping) (especialmente análisis DOM) para extraer datos de un sitio web. Usamos el paquete [Cheerio](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://cheerio.js.org/) para analizar el contenido de una página web utilizando los métodos DOM disponibles de una manera muy similar a la popular biblioteca [jQuery . ](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=http://jquery.com/)Tenga en cuenta, sin embargo, que Cheerio tiene sus limitaciones. Puede lograr un análisis más avanzado utilizando navegadores autónomos como [JSDOM](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=https://github.com/jsdom/jsdom) y [PhantomJS](https://translate.google.com/website?sl=auto&tl=es&hl=es&u=http://phantomjs.org/) .