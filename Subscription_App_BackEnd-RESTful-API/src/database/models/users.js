// -------------------- //
// Sequalize MODEL user //
// -------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const model = sequelize.define(
    // 1. Model name in singular for db consistency.
    'user', // Sequelize looks for a table with this pluralized name.

    // 2. attributes of the database to access. https://sequelize.org/v5/manual/data-types.html
    // Tips: don't use FLOAT, use DECIMAL instead. Don't use BOOLEAN, use INTEGER DEFAULT 0.

    {
      firstName: {
        type: dataTypes.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
      },
      lastName: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
        unique: true,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    }
  );

  // 3 FK Association with the user table. To see your values.

  return model;
};
