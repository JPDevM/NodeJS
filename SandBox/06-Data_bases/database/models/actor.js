module.exports = (sequelize, dataTypes) => {
	const modelName = 'actor';

	const modelColumns = {
		first_name: dataTypes.STRING(100),
		last_name: dataTypes.STRING(100)
	}

	const config = {
		timestamps: false
	}
	
	const actor = sequelize.define(modelName, modelColumns, config);

	actor.associate = function (models) {
		actor.belongsToMany(models.movie, {
			as: 'movies',
			through: 'actor_movie'
		})
	}

	return actor;
}