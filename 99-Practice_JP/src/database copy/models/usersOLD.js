// -------------------- //
// Sequalize MODEL user //
// -------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelUsers = sequelize.define(
    // 1. Model name in singular for db consistency.
    'user', // Sequelize busca una tabla llamada subscriptions

    // 2. attributes of the database to access
    // https://sequelize.org/v5/manual/data-types.html
    // Tips: no usar FLOAT, usar DECIMAL encambio para mayor precición.
    {
      firstName: dataTypes.STRING,
      lastName: dataTypes.STRING,
      email: dataTypes.STRING,
      gender: dataTypes.STRING,
    }
  );

  // 3 FK Association with the user table. To see your values.

  return modelUsers;
};
