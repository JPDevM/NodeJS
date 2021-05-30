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
      isActive: {
        type: dataTypes.Integer, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      type: {
        type: dataTypes.String,
        allowNull: true,
        defaultValue: null,
      },
      startDate: {
        type: dataTypes.Date,
        allowNull: true,
        defaultValue: null,
      },
      endDate: {
        type: dataTypes.Date,
        allowNull: true,
        defaultValue: null,
      },
      urlPath: {
        type: dataTypes.String,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: dataTypes.String,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: dataTypes.Integer, // FK user
        allowNull: true,
        defaultValue: null,
      },
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
