module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelSubscription = sequelize.define(
    // 1. Model name.
    'subscription', // Sequelize busca una tabla llamada subscriptions

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    {
      active: dataTypes.INTEGER,
      popular: dataTypes.INTEGER,
      name: dataTypes.STRING,
      logoIcon: dataTypes.STRING,
      logo: dataTypes.STRING,
      description: dataTypes.STRING,
      price: dataTypes.DECIMAL(10, 2),
      firstPayment: dataTypes.DATE(),
      recurrency: dataTypes.STRING,
      longDate: dataTypes.DATE(),
      notification: {
        type: dataTypes.INTEGER,
        defaultValue: 0
      },
      currency: dataTypes.STRING,
      style: dataTypes.STRING,
      userId: dataTypes.INTERGER,
      colorId: dataTypes.INTEGER,
    }
  );

  // Association with the user table. To see your values.
  modelSubscription.associate = (models) => {
    // The BelongsTo association. Source: https://sequelize.org/master/manual/assocs.html
    // The Image.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
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
