// -------------------- //
// Sequalize model user //
// -------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelUsers = sequelize.define(
    // 1. Model name.
    'users',

    // 2. attributes of the database to access
    {
      urlPath: dataTypes.STRING(),
      description: dataTypes.STRING(),
      userId: dataTypes.NUMBER,
    }
  );

  // Association with the user table. To see your values.
  modelUsers.associate = (models) => {
    // The BelongsTo association. Source: https://sequelize.org/master/manual/assocs.html
    // The modelUsers.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
    modelUsers.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return modelUsers;
};
