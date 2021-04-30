module.exports = (sequelize, dataTypes) => {
	const modelName = 'actor';

	const modelColumns = {
		first_name: dataTypes.STRING(100),
		last_name: dataTypes.STRING(100)
	}
	
	const actor = sequelize.define(modelName, modelColumns);

	return actor;
}