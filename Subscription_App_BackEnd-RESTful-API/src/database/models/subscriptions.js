// ---------------------------- //
// Sequalize MODEL subscription //
// ---------------------------- //

module.exports = (sequelize, dataTypes) => {
  // Define the structure of the model
  const modelSubscription = sequelize.define(
    // 1. Model name in singular for db consistency.
    'subscription', // Sequelize looks for a table with this pluralized name.

    // 2. attributes of the database to access. https://sequelize.org/v5/manual/data-types.html
    // Tips: don't use FLOAT, use DECIMAL instead. Don't use BOOLEAN, use INTEGER DEFAULT 0.

    {
      isActive: {
        type: dataTypes.INTEGER, // 0:false, 1:true --> defaultValue: 0.
        allowNull: false, // MUST have a value. Set defaultValue
      },
      isPopular: {
        type: dataTypes.INTEGER, // 0:false, 1:true --> defaultValue: 0.
        allowNull: false, // MUST have a value. Set defaultValue
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
      },
      logo: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: dataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: dataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      firstPayment: {
        type: dataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      recurrency: {
        type: dataTypes.STRING, // monthly
        allowNull: true,
        defaultValue: null,
      },
      longDate: {
        type: dataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      notification: {
        type: dataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: dataTypes.STRING, // eur
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: 'eur',
      },
      style: {
        type: dataTypes.ENUM('flash', 'white', 'black'),
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: dataTypes.INTEGER, // FK user
        allowNull: true,
        defaultValue: null,
      },
      colorId: {
        type: dataTypes.INTEGER, // FK user
        allowNull: true,
        defaultValue: null,
      },
    }
  );

  // 3. Relations: FK Association with the user table. To see your values.
  modelSubscription.associate = ({ user, color }) => {
    // BelongsTo association. https://sequelize.org/master/manual/assocs.html
    modelSubscription.belongsTo(user, {
      as: 'user',
      foreignKey: 'userId',
    });

    modelSubscription.belongsTo(color, {
      as: 'color',
      foreignKey: 'colorId',
    });
  };

  return modelSubscription;
};
