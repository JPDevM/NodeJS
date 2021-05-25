module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const image = sequelize.define(
    // 1. Model name.
    'promotions',

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    {
      type: dataTypes.INTEGER(),
      startDate: dataTypes.DATE(),
      endDate: dataTypes.DATE(),
      active: dataTypes.BOOLEAN(),
      urlPath: dataTypes.INTEGER(),
      description: dataTypes.TEXT(),
      userId: dataTypes.INTEGER(),
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
