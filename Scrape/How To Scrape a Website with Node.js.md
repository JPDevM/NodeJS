#### Tutorial: [Source](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-with-node-js)

# How To Scrape a Website with Node.js

[Node.js](https://www.digitalocean.com/community/tags/node-js)

- ![Default avatar](https://images.prismic.io/digitalocean/46f22fba-7718-478b-86ae-e8b875f0473e_default-avatar.png?auto=compress,format)

- ByGlad Chinda
- Published on December 12, 2019

### Introduction

Web scraping is the technique of extracting data from websites. This  data can further be stored in a database or any other storage system for analysis or other uses. While extracting data from websites can be done manually, web scraping usually refers to an automated process.

Web scraping is used by most bots and web crawlers for data  extraction. There are various methodologies and tools you can use for  web scraping, and in this tutorial, we will be focusing on using a  technique that involves DOM parsing a webpage.

## Prerequisites

Web scraping can be done in virtually any programming language that has support for `HTTP` and `XML` or `DOM` parsing. In this tutorial, we will focus on web scraping using JavaScript in a Node.js server environment.

With that in mind, this tutorial assumes that readers know the following:

- Understanding of JavaScript and ES6 and ES7 syntax
- Familiarity with jQuery
- Functional programming concepts

Next, we will go through what our end project will be.

## Project Specs

We will be using web scraping to extract some data from the [Scotch](https://scotch.io/) website. Scotch does not provide an API for fetching the profiles and  tutorials/posts of authors. So, we will be building an API for fetching  the profiles and tutorials/posts of Scotch authors.

Here is a screenshot of a demo app created based on the API we will be built in this tutorial.

![Demo App Screenshot](https://assets.digitalocean.com/articles/how-to-scrape-a-website-with-node-js/h2b36kv.png)

Before we begin, let’s go over the packages and dependencies you will need to complete this project.

## Project Setup

Before you begin, ensure that you have Node and `npm` or `yarn` installed on your machine. Since we will use a lot of ES6/7 syntax in  this tutorial, it is recommended that you use the following versions of  Node and npm for complete ES6/7 support: Node `8.9.0` or higher and npm `5.2.0` or higher.

We will be using the following core packages:

1. [Cheerio](https://cheerio.js.org/) - Cheerio is a fast, flexible, and lean implementation of core [jQuery](http://jquery.com/) designed specifically for the server. It makes DOM parsing very easy.
2. [Axios](https://github.com/axios/axios) - Axios is a  promise based HTTP client for the browser and Node.js. It will enable us fetch page contents through HTTP requests.
3. [Express](https://expressjs.com/) - Express is a minimal  and flexible Node.js web application framework that provides a robust  set of features for web and mobile applications.
4. [Lodash](https://lodash.com/) - Lodash is a modern  JavaScript utility library delivering modularity, performance &  extras. It makes JavaScript easier by taking the hassle out of working  with arrays, numbers, objects, strings, etc.

## Step 1 — Create the Application Directory

Create a new directory for the application and run the following command to install the required dependencies for the app.

```bash
mkdir scotch-scraping
```

Change to the new directory:

```bash
cd scotch-scraping
```

Initiate a new package:

```
npm init -y
```

And install app dependencies:

```bash
npm install express morgan axios cheerio lodash
```

## Step 2 — Set Up the Express Server Application

We will go ahead to set up an HTTP server application using Express. Create a `server.js` file in the root directory of your application and add the following code snippet to set up the server:

server.js

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

## Step 3 — Modify npm `scripts`

Finally, we will modify the `"scripts"` section of the `package.json` file to look like the following snippet:

package.json

```json
"scripts": {
  "start": "node server.js"
}
```

We have gotten all we need to start building our application. If you run the command `npm start` in your terminal now, it will start up the application server on port `3000` if it is available. However, we cannot access any route yet since we  are yet to add routes to our application. Let’s start building some  helper functions we will need for web scraping.

## Step 4 — Create Helper Functions

As stated earlier, we will create a couple of helper functions that  will be used in several parts of our application. Create a new `app` directory in your project root. Create a new file named `helpers.js` in the just created directory and add the following content to it:

app/helpers.js

```javascript
const _ = require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");
```

In this code, we are requiring the dependencies we will need for our  helper functions. Let’s go ahead and add the helper functions.

### Creating Utility Helper Functions

We will start by creating some utility helper functions. Add the following snippet to the `app/helpers.js` file.

app/helpers.js

```javascript
///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/*
 * Compose function arguments starting from right to left
 * to an overall function and returns the overall function
 */
const compose = (...fns) => arg => {
  return **_.flattenDeep(fns).reduceRight((current, fn) => {
    if (_**.isFunction(fn)) return fn(current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/*
 * Compose async function arguments starting from right to left
 * to an overall async function and returns the overall async function
 */
const composeAsync = (...fns) => arg => {
  return .flattenDeep(fns).reduceRight(async (current, fn) => {
    if (.isFunction(fn)) return fn(await current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/*
 * Enforces the scheme of the URL is https
 * and returns the new URL
 */
const enforceHttpsUrl = url =>
  _.isString(url) ? url.replace(/^(https?:)?\/\//, "https://") : null;

/*
 * Strips number of all non-numeric characters
 * and returns the sanitized number
 */
const sanitizeNumber = number =>
  _.isString(number)
    ? number.replace(/[^0-9-.]/g, "")
    : _.isNumber(number) ? number : null;

/*
 * Filters null values from array
 * and returns an array without nulls
 */
const withoutNulls = arr =>
  _.isArray(arr) ? arr.filter(val => !_.isNull(val)) : _[_];

/*
 * Transforms an array of ({ key: value }) pairs to an object
 * and returns the transformed object
 */
const arrayPairsToObject = arr =>
  arr.reduce((obj, pair) => ({ ...obj, ...pair }), {});

/*
 * A composed function that removes null values from array of ({ key: value }) pairs
 * and returns the transformed object of the array
 */
const fromPairsToObject = compose(arrayPairsToObject, withoutNulls);
```

Let’s go through the functions one at a time to understand what they do.

- `compose()` - This is a higher-order function that takes one or more functions as its arguments and returns a `composed function`. The composed function has the same effect as invoking the functions  passed in as arguments from right to left, passing the result of a  function invocation as an argument to the next function each time. If any of the arguments passed to `compose()` is not a `function`, the composed function will throw an error whenever it is invoked. Here is a code snippet that describes how `compose()` works.

```javascript
/*
 * -------------------------------------------------
 * Method 1: Functions in sequence
 * -------------------------------------------------
 */
function1( function2( function3(arg) ) );

/*
 * -------------------------------------------------
 * Method 2: Using compose()
 * -------------------------------------------------
 * Invoking the composed function has the same effect as (Method 1)
 */
const composedFunction = compose(function1, function2, function3);

composedFunction(arg);
```

- `composeAsync()` - This function works in the same way as the `compose()` function. The only difference being that it is asynchronous. Hence, it  is ideal for composing functions that have asynchronous behavior - for  example, functions that return promises.
- `enforceHttpsUrl()` - This function takes a `url` string as argument and returns the URL with `https` scheme provided the `url` begins with either `https://`, `http://` or `//`. If the `url` is not a string then `null` is returned. Here is an example.

```javascript
enforceHttpsUrl('scotch.io'); // returns => 'scotch.io'
enforceHttpsUrl('//scotch.io'); // returns => 'https://scotch.io'
enforceHttpsUrl('http://scotch.io'); // returns => 'https://scotch.io'
```

- `sanitizeNumber()` - This function expects a `number` or `string` as argument. If a `number` is passed to it, it returns the number. However, if a `string` is passed to it, it removes non-numeric characters from the string and  returns the sanitized string. For other value types, it returns `null`. Here is an example:

```javascript
sanitizeNumber(53.56); // returns => 53.56
sanitizeNumber('-2oo,40'); // returns => '-240'
sanitizeNumber('badnumber.decimal'); // returns => '.'
```

- `withoutNulls()` - This function expects an `array` as an argument and returns a new array that only contains the `non-null` items of the original array. Here is an example.

```javascript
withoutNulls([ 'String', [], null, {}, null, 54 ]); // returns => ['String', [], {}, 54]
```

- `arrayPairsToObject()` - This function expects an `array` of (`{ key: value }`) objects, and returns a transformed object with the keys and values. Here is an example.

```javascript
const pairs = [ { key1: 'value1' }, { key2: 'value2' }, { key3: 'value3' } ];

arrayPairsToObject(pairs); // returns => { key1: 'value1', key2: 'value2', key3: 'value3' }
```

- `fromPairsToObject()` - This is a composed function created using `compose()`. It has the same effect as executing:

```javascript
arrayPairsToObject( withoutNulls(array) );
```

### Request and Response Helper Functions

Add the following to the `app/helpers.js` file.

app/helpers.js

```javascript
/*
 * Handles the request(Promise) when it is fulfilled
 * and sends a JSON response to the HTTP response stream(res).
 */
const sendResponse = res => async request => {
  return await request
    .then(data => res.json({ status: "success", data }))
    .catch(({ status: code = 500 }) =>
      res.status(code).json({ status: "failure", code, message: code == 404 ? 'Not found.' : 'Request failed.' })
    );
};

/*
 * Loads the html string returned for the given URL
 * and sends a Cheerio parser instance of the loaded HTML
 */
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

Here, we have added two new functions: `sendResponse()` and `fetchHtmlFromUrl()`. Let’s try to understand what they do.

- `sendResponse()` - This is a higher-order function that expects an Express HTTP response stream (`res`) as its argument and returns an `async function`. The returned `async function` expects a `promise` or a `thenable` as its argument (`request`). If the `request` promise resolves, then a successful JSON response is sent using `res.json()`, containing the resolved data. If the promise rejects, then an error  JSON response with an appropriate HTTP status code is sent. Here is how  it can be used in an Express route:

```javascript
app.get('/path', (req, res, next) => {
  const request = Promise.resolve([1, 2, 3, 4, 5]);
  sendResponse(res)(request);
});
```

Making a `GET` request to the `/path` endpoint will return this JSON response:

```json
{
  "status": "success",
  "data": [1, 2, 3, 4, 5]
}
```

- `fetchHtmlFromUrl()` - This is an `async function` that expects a `url` string as its argument. First, it uses `axios.get()` to fetch the content of the URL (which returns a promise). If the promise resolves, it uses `cheerio.load()` with the returned content to create a Cheerio parser instance, and then returns the instance. However, if the promise rejects, it throws an  error with an appropriate status code. The Cheerio parser instance that is returned by this function will  enable us extract the data we require. We can use it in much similar  ways as we use the jQuery instance returned by calling `$()` or `jQuery()` on a DOM target.

### DOM Parsing Helper Functions

Let’s add some additional functions to help us with DOM parsing. Add the following content to the `app/helpers.js` file.

app/helpers.js

```javascript
///////////////////////////////////////////////////////////////////////////////
// HTML PARSING HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/*
 * Fetches the inner text of the element
 * and returns the trimmed text
 */
const fetchElemInnerText = elem => (elem.text && elem.text().trim()) || null;

/*
 * Fetches the specified attribute from the element
 * and returns the attribute value
 */
const fetchElemAttribute = attribute => elem =>
  (elem.attr && elem.attr(attribute)) || null;

/*
 * Extract an array of values from a collection of elements
 * using the extractor function and returns the array
 * or the return value from calling transform() on array
 */
const extractFromElems = extractor => transform => elems => $ => {
  const results = elems.map((i, element) => extractor($(element))).get();
  return _.isFunction(transform) ? transform(results) : results;
};

/*
 * A composed function that extracts number text from an element,
 * sanitizes the number text and returns the parsed integer
 */
const extractNumber = compose(parseInt, sanitizeNumber, fetchElemInnerText);

/*
 * A composed function that extracts url string from the element's attribute(attr)
 * and returns the url with https scheme
 */
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

We’ve added a few more functions. Here are the functions and what they do:

- `fetchElemInnerText()` - This function expects an `element` as argument. It extracts the `innerText` of the element by calling `elem.text()`, it trims the text of surrounding whitespaces and returns the trimmed inner text. Here is an example.

```javascript
const $ = cheerio.load('<div class="fullname">  Glad Chinda </div>');
const elem = $('div.fullname');

fetchElemInnerText(elem); // returns => 'Glad Chinda'
```

- `fetchElemAttribute()` - This is a higher-order function that expects an `attribute` as argument and returns another function that expects an `element` as argument. The returned function extracts the value of the given `attribute` of the element by calling `elem.attr(attribute)`. Here is an example.

```javascript
const $ = cheerio.load('<div class="username" title="Glad Chinda">@gladchinda</div>');
const elem = $('div.username');

// fetchTitle is a function that expects an element as argument
const fetchTitle = fetchElemAttribute('title');

fetchTitle(elem); // returns => 'Glad Chinda'
```

- `extractFromElems()` - This is a higher-order function  that returns another higher-order function. Here, we have used a  functional programming technique known as [currying](https://en.wikipedia.org/wiki/Currying) to create a sequence of functions each requiring just one argument. Here is the sequence of arguments:

```
extractorFunction -> transformFunction -> elementsCollection -> cheerioInstance
```

`extractFromElems()` makes it possible to extract data from a collection of similar elements using an `extractor` function, and also transform the extracted data using a `transform` function. The `extractor` function receives an element as an argument, while the `transform` function receives an array of values as an argument. Let’s say we have a collection of elements, each containing the name of a person as `innerText`. We want to extract all these names and return them in an array, all in uppercase. Here is how we can do this using `extractFromElems()`:

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

- `extractNumber()` - This is a composed function that expects an `element` as argument and tries to extract a number from the `innerText` of the element. It does this by composing `parseInt()`, `sanitizeNumber()` and `fetchElemInnerText()`. It has the same effect as executing:

```javascript
parseInt( sanitizeNumber( fetchElemInnerText(elem) ) );
```

- `extractUrlAttribute()` - This is a composed higher-order function that expects an `attribute` as argument and returns another function that expects an `element` as argument. The returned function tries to extract the URL value of an attribute in the element and returns it with the `https` scheme. Here is a snippet that shows how it works:

```javascript
// METHOD 1
const fetchAttribute = fetchElemAttribute(attr);
enforceHttpsUrl( fetchAttribute(elem) );

// METHOD 2: Using extractUrlAttribute()
const fetchUrlAttribute = extractUrlAttribute(attr);
fetchUrlAttribute(elem);
```

Finally, we export all the helper functions we have created using `module.exports`. Now that we have our helper functions, we can proceed to the web scraping part of this tutorial.

## Step 5 — Set Up Scraping by Calling the URL

Create a new file named `scotch.js` in the `app` directory of your project and add the following content to it:

app/scotch.js

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

/*
 * Resolves the url as relative to the base scotch url
 * and returns the full URL
 */
const scotchRelativeUrl = url =>
  _.isString(url) ? `${SCOTCH_BASE}${url.replace(/^\/*?/, "/")}` : null;

/*
 * A composed function that extracts a url from element attribute,
 * resolves it to the Scotch base url and returns the url with https
 */
const extractScotchUrlAttribute = attr =>
  compose(enforceHttpsUrl, scotchRelativeUrl, fetchElemAttribute(attr));
```

As you can see, we imported `lodash` as well as some of the helper functions we created earlier. We also defined a constant named `SCOTCH_BASE` that contains the base URL of the Scotch website. Finally, we added two helper functions:

- `scotchRelativeUrl()` - This function takes a relative `url` string as argument and returns the URL with the pre-configured `SCOTCH_BASE` prepended to it. If the `url` is not a string then `null` is returned. Here is an example.

```javascript
scotchRelativeUrl('tutorials'); // returns => 'https://scotch.io/tutorials'
scotchRelativeUrl('//tutorials'); // returns => 'https://scotch.io///tutorials'
scotchRelativeUrl('http://domain.com'); // returns => 'https://scotch.io/http://domain.com'
```

- `extractScotchUrlAttribute()` - This is a composed higher-order function that expects an `attribute` as argument and returns another function that expects an `element` as argument. The returned function tries to extract the URL value of an attribute in the element, prepends the pre-configured `SCOTCH_BASE` to it, and returns it with the `https` scheme. Here is a snippet that shows how it works:

```javascript
// METHOD 1
const fetchAttribute = fetchElemAttribute(attr);
enforceHttpsUrl( scotchRelativeUrl( fetchAttribute(elem) ) );

// METHOD 2: Using extractScotchUrlAttribute()
const fetchUrlAttribute = extractScotchUrlAttribute(attr);
fetchUrlAttribute(elem);
```

## Step 6 — Using Extraction Functions

We want to be able to extract the following data for any Scotch author:

- **profile**: (name, role, avatar, etc.)
- **social links**: (Facebook, Twitter, GitHub, etc.)
- **stats**: (total views, total posts, etc.)
- **posts**

If you recall, the `extractFromElems()` helper function we created earlier requires an `extractor` function for extracting content from a collection of similar elements.  We are going to define some extractor functions in this section.

### Extracting Social Links

First, we will create an `extractSocialUrl()` function for extracting the social network name and URL from a social link `<a>` element. Here is the DOM structure of the social link `<a>` element expected by `extractSocialUrl()`.

```markup
<a href="https://github.com/gladchinda" target="_blank" title="GitHub">
  <span class="icon icon-github">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="50" height="50" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      ...
    </svg>
  </span>
</a>
```

Calling the `extractSocialUrl()` function should return an object that looks like the following:

```javascript
{ github: 'https://github.com/gladchinda' }
```

Let’s go on to create the function. Add the following content to the `app/scotch.js` file.

app/scotch.js

```javascript
///////////////////////////////////////////////////////////////////////////////
// EXTRACTION FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/*
 * Extract a single social URL pair from container element
 */
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

Let’s try to understand how the `extractSocialUrl()` function works:

1. First, we fetch the `<span>` child element with an `icon` class. We also define a regular expression that matches social-icon class names.
2. We define `onlySocialClasses()` higher-order function that takes a regular expression as its argument and returns a function. The  returned function takes a string of class names separated by spaces. It  then uses the regular expression to extract only the social class names  from the list and returns them in an array. Here is an example:

```javascript
const regex = /^(?:icon|color)-(.+)$/;
const extractSocial = onlySocialClasses(regex);
const classNames = 'first-class another-class color-twitter icon-github';

extractSocial(classNames); // returns [ 'color-twitter', 'icon-github' ]
```

1. Next, we define `getSocialFromClasses()` higher-order  function that takes a regular expression as its argument and returns a  function. The returned function takes an array of single class strings.  It then uses the regular expression to extract the social network name  from the first class in the list and returns it. Here is an example:

```javascript
const regex = /^(?:icon|color)-(.+)$/;
const extractSocialName = getSocialFromClasses(regex);
const classNames = [ 'color-twitter', 'icon-github' ];

extractSocialName(classNames); // returns 'twitter'
```

1. Afterwards, we extract the `href` attribute URL from the element. We also extract the social network name from the `<span>` icon element using a composed function created by composing `getSocialFromClasses(regex)`, `onlySocialClasses(regex)` and `fetchElemAttribute('class')`.
2. Finally, we return an object with the social network name as key and the `href` URL as value. However, if no social network was fetched, then null is returned. Here is an example of the returned object:

```javascript
{ twitter: 'https://twitter.com/gladchinda' }
```

### Extracting Posts and Stats

We will go ahead to create two additional extraction functions namely: `extractPost()` and `extractStat()`, for extracting posts and stats respectively. Before we create the  functions, let’s take a look at the DOM structure of the elements  expected by these functions.

Here is the DOM structure of the element expected by `extractPost()`.

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

Here is the DOM structure of the element expected by `extractStat()`.

```markup
<div class="profile__stat column is-narrow">
  <div class="stat">41,454</div>
  <div class="label">Pageviews</div>
</div>
```

Add the following content to the `app/scotch.js` file.

app/scotch.js

```javascript
/*
 * Extract a single post from container element
 */
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

/*
 * Extract a single stat from container element
 */
const extractStat = elem => {
  const statElem = elem.find(".stat")
  const labelElem = elem.find('.label');

  const lowercase = val => _.isString(val) ? val.toLowerCase() : null;

  const stat = extractNumber(statElem);
  const label = compose(lowercase, fetchElemInnerText)(labelElem);

  return { [label]: stat };
};
```

The `extractPost()` function extracts the title, image,  URL, views, and comments of a post by parsing the children of the given  element. It uses a couple of helper functions we created earlier to  extract data from the appropriate elements.

Here is an example of the object returned from calling `extractPost()`.

```javascript
{
  title: "Password Strength Meter in AngularJS",
  image: "https://cdn.scotch.io/7540/iKZoyh9WSlSzB9Bt5MNK_post-cover-photo.jpg",
  url: "https://scotch.io//tutorials/password-strength-meter-in-angularjs",
  views: 24280,
  comments: 5
}
```

The `extractStat()` function extracts the stat data contained in the given element. Here is an example of the object returned from calling `extractStat()`.

```javascript
{ pageviews: 41454 }
```

## Step 7 — Extracting a Specific Web Page

Now we will proceed to define the `extractAuthorProfile()` function that extracts the complete profile of the Scotch author. Add the following content to the `app/scotch.js` file.

app/scotch.js

```javascript
/*
 * Extract profile from a Scotch author's page using the Cheerio parser instance
 * and returns the author profile object
 */
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

/*
 * Fetches the Scotch profile of the given author
 */
const fetchAuthorProfile = author => {
  const AUTHOR_URL = `${SCOTCH_BASE}/@${author.toLowerCase()}`;
  return composeAsync(extractAuthorProfile, fetchHtmlFromUrl)(AUTHOR_URL);
};

module.exports = { fetchAuthorProfile };
```

The `extractAuthorProfile()` function is very straight-forward. We first use `$` (the cheerio parser instance) to find a couple of elements and element collections.

Next, we use the `extractFromElems()` helper function together with the extractor functions we created earlier in this section (`extractPost`, `extractStat` and `extractSocialUrl`) to create higher-order extraction functions. Notice how we use the `fromPairsToObject` helper function we created earlier as a transform function.

Finally, we use `Promise.all()` to extract all the  required data, leveraging on a couple of helper functions we created  earlier. The extracted data is contained in an array structure following this sequence: author name, role, Scotch link, avatar link, social  links, stats, and posts.

Notice how we use destructuring in the `.then()` promise  handler to construct the final object that is returned when all the  promises resolve. The returned object should look like the following:

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

We also define the `fetchAuthorProfile()` function that  accepts an author’s Scotch username and returns a Promise that resolves  to the profile of the author. For an author whose username is `gladchinda`, the Scotch URL is `https://scotch.io/@gladchinda`.

`fetchAuthorProfile()` uses the `composeAsync()` helper function to create a composed function that first fetches the DOM content of the author’s Scotch page using the `fetchHtmlFromUrl()` helper function, and finally extracts the profile of the author using the `extractAuthorProfile()` function we just created.

Finally, we export `fetchAuthorProfile` as the only identifier in the `module.exports` object.

## Step 8 — How to Create a Route

We are almost done with our API. We need to add a route to our server to enable us to fetch the profile of any Scotch author. The route will  have the following structure, where the `author` parameter represents the username of the Scotch author.

```http
GET /scotch/:author
```

Let’s go ahead and create this route. We will make a couple of changes to the `server.js` file. First, add the following to the `server.js` file to require some of the functions we need.

server.js

```javascript
// Require the needed functions
const { sendResponse } = require('./app/helpers');
const { fetchAuthorProfile } = require('./app/scotch');
```

Finally, add the route to the `server.js` file immediately after the middlewares.

server.js

```javascript
// Add the Scotch author profile route
app.get('/scotch/:author', (req, res, next) => {
  const author = req.params.author;
  sendResponse(res)(fetchAuthorProfile(author));
});
```

As you can see, we pass the `author` received from the route parameter to the `fetchAuthorProfile()` function to get the profile of the given author. We then use the `sendResponse()` helper method to send the returned profile as a JSON response.

We have successfully built our API using a web scraping technique. Go ahead and test the API by running `npm start` command on your terminal. Launch your favorite HTTP testing tool e.g [Postman](https://www.getpostman.com/) and test the API endpoint. If you followed all the steps correctly, you should have a result that looks like the following demo:

## Conclusion

In this tutorial, we have seen how we can employ [web scraping](https://en.wikipedia.org/wiki/Web_scraping) techniques (especially DOM parsing) to extract data from a website. We used the [Cheerio](https://cheerio.js.org/) package to parse the content of a webpage using available DOM methods in a much similar fashion as the popular [jQuery](http://jquery.com/) library. Note however that Cheerio has its limitations. You can achieve more advanced parsing using headless browsers like [JSDOM](https://github.com/jsdom/jsdom) and [PhantomJS](http://phantomjs.org/).