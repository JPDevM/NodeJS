// -------------------------- //
// Sequalize model promotions //
// -------------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelPromotion = sequelize.define(
    // 1. Model name in singular for db consistency.
    'promotion', // Sequelize looks for a table with this pluralized name.
    // Tips: no usar FLOAT, usar DECIMAL encambio para mayor precición.

    // 2. attributes of the database to access. https://sequelize.org/v5/manual/data-types.html
    // Tips: don't use FLOAT, use DECIMAL instead. Don't use BOOLEAN, use INTEGER DEFAULT 0.

    {
      isActive: {
        type: dataTypes.INTEGER, // 0:false, 1:true
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      type: {
        type: dataTypes.STRING, // cuponCode,
        allowNull: true,
        defaultValue: null,
      },
      startDate: {
        type: dataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      endDate: {
        type: dataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      urlPath: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: dataTypes.INTEGER, // FK user
        allowNull: true,
        defaultValue: null,
      },
    }
  );

  // 3. Relations: FK Association with the user table. To see your values.
  modelPromotion.associate = (models) => {
    // BelongsTo association. https://sequelize.org/master/manual/assocs.html
    modelPromotion.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return modelPromotion;
};
