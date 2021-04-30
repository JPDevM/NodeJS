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
		},
		// 3. Configuraciones adicionales
		{
			timestamps: false, // para definir si queremos o no las columnas createdAt y updatedAt
		}
	)

	return movie;
}