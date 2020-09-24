## Middlewares

Los middlewares son funciones que toman 3 argumentos:

- El request
- El response
- La función next

Un middleware es una función que define una lógica adicional para la aplicación o para una ruta particular.

Existen 3 tipos de middlewares:

- Nativos => app.use()
- Propios (los que creamos)
- De terceros

En palabras resumidas, la implementación del middleware es: una función que se ejecuta antes del controlador.

## Arquitectura de una aplicación con Express

Siempre toda aplicación con express va a necesitar de:

1. Rutas
2. Controllers
3. Vistas - Template engine (opcional)
4. Modelos - DB (opcional)
5. Middlewares (opcional)

## Creando registros en nuestra aplicación

Cuando desde un formulario se envía información a nuestro servidor. Esa información viaja en el request.

Es ahí donde Express captura es data, y la pasa al objeto `req` y la deja en una propiedad que se llama `body`.

`req.body` es a su vez un objeto literal que se creará de manera automática, y que tendrá como propiedades TODOS los campos del formulario. Los valores de esas propiedades serán la información que se suministró en cada campo.

```js
// Dentro del controller
console.log(req.body); // undefined
```

Al principio `req.body` dará como `undefined`. ¿Por qué? Dado a que básicamente Express no sabe como manejar esos datos. Nosotros tenemos que decirle a nuestra aplicación, que queremos trabajar con datos que vendrán desde un formulario.

Lo que vamos a hacer es ir al archivo `app.js` y haciendo uso del método `.use()` vamos a "enseñarle" a Express como debe trabajar con la información.

```js
app.use(express.urlencoded({ extended: false }));
```

Con la línea anterior, ahora si podemos tener disponible el `req.body`.

```js
// Dentro del controller
console.log(req.body); // {firstName: 'Jane', lastName: 'Doe', ...}
```