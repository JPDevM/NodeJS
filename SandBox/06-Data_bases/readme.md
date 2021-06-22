# Trabajando con sequelize

Sequelize es un ORM para trabajar con bases de datos dentro de los entornos de express. [Aquí se encuentra la documentación oficial](https://sequelize.org/)

1. Instalar sequelize en nuestro proyecto

```shell
$ npm install sequelize
```

2. Instalar *mysql2*, es un plugin para trabajar con MySQL dentro Sequelize.

```shell
$ npm install mysql2
```

Despues de instaladas esta librerías, vamos a necesitar comenzar a configurar la estructura de la base de datos con la que vamos a trabajar.

Para poder generar toda la estructura de archivos que necesita Sequelize para trabajar, necesitamos de un archivo llamado `.sequelizerc`. El archivo deberá tener esta estructura: 

```js
const path = require('path');

module.exports = {
	config: path.resolve('./database/config', 'config.js'),
	'models-path': path.resolve('./database/models'),
	'seeders-path': path.resolve('./database/seeders'),
	'migrations-path': path.resolve('./database/migrations'),
};
```

3. Una vez tengamos el archivo, ahora desde la terminal vamos a ejecutar un comando, para que se generen esta estructura de carpetas de manera automática.

```shell
$ sequelize init
```

> El comando `sequelize` es un comando de consola que para tenerlo disponible necesitamos previamente instalarlo de manera GLOBAL. ¿Cómo se instala este comando? `npm i sequelize-cli -g`. 

4. Con la estructura de archivos listos, vamos a `/database/config/config.js` y le vamos a hacer ciertas modificaciones:

```js
module.exports = { // sumar el module.exports =
  "development": {
    "username": "root", // el usuario de MySQL server (por defecto es root)
    "password": null, // la contraseña de MySQL server (por defecto es vacía)
    "database": "movies_db_2020", // acá va el nombre de la DB con la que nos vamos a conectar
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

5. **Creando un modelo**: como nos interesa tener un acceso a la base de datos de una manera más performante, lo recomendable será trabajar con modelos, para poder usar los métodos de consulta en vez de hacer consultas cruda. Para crear un modelo, vamos a crear un archivo dentro de la carpeta `/models`. Este archivo tendrá como nombre, el mismo nombre de la tabla de la DB a la que queremos tener acceso.

> *Importante:* un modelo es la representación en código de una tabla. Dentro del modelo, nosotros definimos qué columnas queremos traer.

La estructura básica de un modelo es así:

# Aquí me quedé

```js
module.exports = (sequelize, dataTypes) => {
	// Definir la estructura del modelo
	const movie = sequelize.define(
		// 1. nombre del modelo - cómo vamos a reconocer a este modelo por fuera de este archivo
		'peliculas',
		// 2. columnas a las que queremos tener acceso
		{
			title: dataTypes.STRING()
		},
		// 3. Configuraciones adicionales
		{
			tableName: 'movies', // nombre real de la tabla
			timestamps: false, // para definir si queremos o no las columnas createdAt y updatedAt
		}
	)

	return movie;
}
```

6. **Configuraciones adicionales para TODOS los modelos**: si es necesario agregar una particularidad a TODOS los modelos por igual, podemos hacer eso pero ahora dentro del archivo `./config/config.js`, así:

```js
module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    // Configuraciones adicionales para TODOS los modelos
    "define": {
      underscored: true // esto aplica para TODOS los modelos
    }
  },
  // ...
}
```

7. **Métodos de consulta**: los métodos disponibles para TODOS los modelos son: 
* `findAll`: busca todos los registros en la tabla para esta entidad
* `findByPk`: busca un registro a partir de su Primary Key (id)
* `findOne`: busca un registro dependiendo de un *where* y un *limit*
* `create`: inserta un registro nuevo en la tabla
* `update`
* `destroy`: elimina un registro de la tabla

8. **Soft deletes**: un mecanismo que nos permite evitar tener que borrar algo de la DB. Un soft delete es una marca de tiempo en una columna de la tabla que define que ese registro fue "eliminado". Para que el soft delete pueda ser usado de manera correcta. Tenemos que implementar esto en el archivo `config.js`:

```js
module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    // Configuraciones adicionales para TODOS los modelos
    "define": {
      underscored: true // esto aplica para TODOS los modelos
      paranoid: true // esto aplica para TODOS los modelos
    }
  },
  // ...
}
```

9. **Relaciones**
* Para relacionar dos modelos entre sí, necesitamos los dos modelos dentro de nuestra carpeta `models`
* Dentro del modelo que queremos relacionar vamos a hacer lo siguiente:
```js
movie.associate = function (models) {
    // Relación de pertenece a (N:1):
		movie.belongsTo(models.genre, { 
			as: 'genre', // alias de la relacion
			foreignKey: 'genre_id'
		 });
	}
```
```js
genre.associate = function (models) {
		// Relación de tiene muchos (1:N):
		genre.hasMany(models.movie, {
			as: 'movies', // alias de la relacion
			foreignKey: 'genre_id' // la columna que almacena la referencia a la otra tabla
		});
	}
```

* El método de la relación, recibe dos argumentos:
  - Nombre del modelo -> `models.genre`
  - Configuración -> `{ as: 'aliasDeLaRelación', foreignKey: 'columna_con_id' }`
* En la consulta para poder traer la relación tenemos que hacer esto:
```js
movie.findAll({
  include: ['genre']
})
```

10. **Trabajando con el modelo dentro del controlador**: Lo primero que necesitamos hacer es requerir el modelo dentro del controlador que estemos trabajando:

```js
const { image } = require('../database/models');
```

Una vez hecho esto, ahora vamos a poder usar los métodos descritos anteriormente, así:

```js
const controller = {
  browse: (req, res) => {
    image.findAll()
      .then(images => {
        return res.json(images);
      })
  },
}

module.exports = controller;
```


## Todo

- [X] Configuraciones adicionales para todos los modelos
- [X] Métodos de consulta: `findAll`, `findByPk`, `findOne`, `create`, `update`, `delete`
- [X] Operadores de sequelize: `where`, `order`, `limit`, `offset`
- [X] Soft deletes
- [X] Relaciones entre modelos
- [ ] Desarrollar endPoints para la API *pinterest_clone*