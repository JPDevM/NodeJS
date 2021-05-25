module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const image = sequelize.define(
    // 1. Model name.
    'subscriptions',

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    {
      active: dataTypes.BOOLEAN(),
      popular: dataTypes.BOOLEAN(),
      name: dataTypes.TEXT(),
      colorId: Sequelize.INTEGER(),
      colorHexa: dataTypes.STRING(),
      logoIcon: dataTypes.STRING(),
      logo: dataTypes.STRING(),
      description: dataTypes.STRING(),
      price: Sequelize.FLOAT(),
      firstPayment: dataTypes.DATE(),
      recurrency: dataTypes.STRING(),
      longDate: dataTypes.DATE(),
      notification: dataTypes.BOOLEAN(),
      currency: dataTypes.STRING(),
      style: dataTypes.STRING(),
      userId: dataTypes.NUMBER,
    }
  );

  // Association with the user table. To see your values.
  image.associate = (models) => {
    // The BelongsTo association. Source: https://sequelize.org/master/manual/assocs.html
    // The Image.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
    image.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return image;
};
