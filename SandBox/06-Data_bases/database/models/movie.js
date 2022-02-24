module.exports = (sequelize, dataTypes) => {
	// Definir la estructura del modelo
	const movie = sequelize.define(
		// 1. nombre del modelo - cómo vamos a reconocer a este modelo por fuera de este archivo
		'movie',
		// 2. columnas a las que queremos tener acceso
		{
			title: dataTypes.STRING(),
			rating: dataTypes.NUMBER,
			release_date: dataTypes.DATE, 
		}
	)

	// Relaciones
	movie.associate = function (models) {
		// Una película pertenece a un género -> N:1
		movie.belongsTo(models.genre, { 
			as: 'genre', // alias de la relacion
			foreignKey: 'genre_id' // la columna que almacena la referencia a la otra tabla
		 });

		 // Una película tiene muchos actores -> N:N
		 movie.belongsToMany(models.actor, { 
			 as: 'actors',
			 through: 'actor_movie'
		 })
	}

	return movie;
}