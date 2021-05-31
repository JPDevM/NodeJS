// --------------------- //
// Sequalize MODEL color //
// --------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelColors = sequelize.define(
    // 1. Model name in singular for db consistency.
    'color', // Sequelize looks for a table with this pluralized name.

    // 2. attributes of the database to access. https://sequelize.org/v5/manual/data-types.html
    // Tips: don't use FLOAT, use DECIMAL instead. Don't use BOOLEAN, use INTEGER DEFAULT 0.
    {
      colorHexa: {
        type: DataTypes.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
      },
    }
  );
  // 3. FK Association with the user table. To see your values.
  return modelColors;
};
