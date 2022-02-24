# Session y Cookies

Con session y cookies podemos compartir información a lo largo de toda la aplicación sin estar buscando dicha información constantemente.

```js
res.render('home', {
	user: 'Jhon Doe'
})
```

Si bien la anterior manera nos permite compartir información entre el controller y las views. Está información se pierde cuando queremos acceder a otra vista.

## Session

Es información que se guarda del lado del servidor. Esa información que se guarda ahí solamente va a estar disponible mientras el cliente esté abierto (el navegador).

Para trabajar con session en express. Express ya tiene un método que nos permite configurar esto de una manera fácil.

Primero instalamos `express-session`.

```js
const session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
	secret: 's3Cur3',
  	name: 'sessionId',
	saveUninitialized: false,
	resave: false,
}));
```

Lo anterior, setea un objeto literal en el objeto `request` que es de lectura y escritura y nos va a permitir setear cualquier cosa en `session`.

```js
req.session.user = 'Pedro Pérez';
```

## Cookies

Es información que se guarda del lado del cliente (navegador). Esa información queda disponible mientras que el usuario NO elimine sus cookies del navegador o mientras que nosotros como desarrolladores no digamos lo contrario. Toda la información que se guarda en una cookie, deber ser información NO sensible.

**Una cookie SIEMPRE almacena texto.**

Para trabajar cookies en express tenemos que instalar una librería llamada `cookie-parser`.

Una vez instalada en tu aplicación pasas esta función como un middleware.

```js
const cookies = require('cookie-parser');
app.use(cookies());
```

Cuando hacemos esto, ahora tenemos la posibilidad de acceder a las cookies así:

```js
// Viene des Request
req.cookies; // Objeto literal
// Sale en el Response
res.cookie(); // Método
```

`req.cookies`, es un objeto literal de solo lectura. Traerá todas las cookies que se hayan guardado en el navegador.

¿Cómo guardamos cookies desde el servidor en el navegador?

```js
res.cookie('dePrueba', 'Esto es un texto cualquiera');
```

Hay un tercer argumento que se puede pasar al momento de setear una cookie, ese tercer argumento será un objeto literal que nos permite definir la edad máxima de la cookie.

```js
res.cookie('dePrueba', 'Esto es un texto cualquiera', { maxAge: Date.now() + (1000 * 60) });
```