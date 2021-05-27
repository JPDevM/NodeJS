// -------------------------- //
// Sequalize model promotions //
// -------------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelPromotions = sequelize.define(
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
  modelPromotions.associate = (models) => {
    // The BelongsTo association. Source: https://sequelize.org/master/manual/assocs.html
    // The modelPromotions.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
    modelPromotions.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return modelPromotions;
};
