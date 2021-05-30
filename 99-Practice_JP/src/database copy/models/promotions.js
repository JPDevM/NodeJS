// -------------------------- //
// Sequalize model promotions //
// -------------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelPromotion = sequelize.define(
    // 1. Model name in singular for db consistency.
    'promotion', // Sequelize finds the promotions table.
    // Tips: no usar FLOAT, usar DECIMAL encambio para mayor precición.

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    {
      type: dataTypes.INTEGER,
      startDate: dataTypes.DATE,
      endDate: dataTypes.DATE,
      active: dataTypes.BOOLEAN,
      urlPath: dataTypes.INTEGER,
      description: dataTypes.TEXT,
      userId: dataTypes.INTEGER, // FK user
    }
  );

  // 3. FK Association with the user table. To see your values.
  modelPromotion.associate = (models) => {
    // BelongsTo association. https://sequelize.org/master/manual/assocs.html
    modelPromotion.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return modelPromotion;
};
