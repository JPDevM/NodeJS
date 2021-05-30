// --------------------- //
// Sequalize MODEL color //
// --------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelColors = sequelize.define(
    // 1. Model name in singular for db consistency.
    'color', // Sequelize busca una tabla llamada subscriptions

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    // Tips: no usar FLOAT, usar DECIMAL encambio para mayor precición.
    {
      colorHexa: dataTypes.STRING,
    }
  );
  // 3. FK Association with the user table. To see your values.
  return modelColors;
};
