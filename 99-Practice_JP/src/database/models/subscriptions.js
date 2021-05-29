// ---------------------------- //
// Sequalize MODEL subscription //
// ---------------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelSubscription = sequelize.define(
    // 1. Model name in singular for db consistency.
    'subscription', // Sequelize finds the subscriptions table

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    // Tips: no usar FLOAT, usar DECIMAL encambio para mayor precición.
    {
      isActive: dataTypes.INTEGER, // true - false
      isPopular: dataTypes.INTEGER, // true - false
      name: dataTypes.STRING,
      logo: dataTypes.STRING,
      description: dataTypes.STRING,
      price: {
        type: dataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      firstPayment: dataTypes.DATE(),
      recurrency: dataTypes.STRING,
      longDate: dataTypes.DATE(),
      notification: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      currency: {
        type: dataTypes.STRING,
        defaultValue: 'eur',
      },
      style: dataTypes.STRING,
      userId: dataTypes.INTEGER, // FK user
      colorId: dataTypes.INTEGER, // FK color
    }
  );

  // 3. FK Association with the user table. To see your values.
  modelSubscription.associate = (models) => {
    // BelongsTo association. https://sequelize.org/master/manual/assocs.html
    modelSubscription.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });

    modelSubscription.belongsTo(models.color, {
      as: 'color',
      foreignKey: 'colorId',
    });
  };

  return modelSubscription;
};
