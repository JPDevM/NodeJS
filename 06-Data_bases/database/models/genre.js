module.exports = (sequelize, dataTypes) => {
	
	const genre = sequelize.define(
		'genre',
		{ 
			name: dataTypes.STRING(),
		},
		{
			timestamps: false
		}
	)

	// Relaciones
	genre.associate = function (models) {
		// Un género tiene muchas películas -> 1:N
		genre.hasMany(models.movie, {
			as: 'movies', // alias de la relacion
			foreignKey: 'genre_id' // la columna que almacena la referencia a la otra tabla
		});
	}

	return genre;
}