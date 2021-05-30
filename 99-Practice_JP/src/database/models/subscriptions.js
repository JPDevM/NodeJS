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
      isActive: {
        type: dataTypes.Integer, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      isPopular: {
        type: dataTypes.Integer, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      name: {
        type: dataTypes.String,
        allowNull: false, // MUST have a value. Set defaultValue
      },
      logo: {
        type: dataTypes.String,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: DataTypes.String,
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: dataTypes.Decimal(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      firstPayment: {
        type: dataTypes.Date,
        allowNull: true,
        defaultValue: null,
      },
      recurrency: {
        type: DataTypes.String,
        allowNull: true,
        defaultValue: null,
      },
      longDate: {
        type: dataTypes.Date,
        allowNull: true,
        defaultValue: null,
      },
      notification: {
        type: dataTypes.Integer,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: dataTypes.Integer, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: 'eur',
      },
      style: {
        type: DataTypes.String,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: dataTypes.Integer, // FK user
        allowNull: true,
        defaultValue: null,
      },
      colorId: {
        type: dataTypes.Integer, // FK user
        allowNull: true,
        defaultValue: null,
      },
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
