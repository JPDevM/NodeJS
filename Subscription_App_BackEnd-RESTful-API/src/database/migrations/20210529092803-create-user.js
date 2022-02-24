'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* Create table */
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(125),
        allowNull: false, // MUST have a value. Set defaultValue
        unique: true, // specify STRING(125)
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    /* Delete table */
    await queryInterface.dropTable('users');
  },
};
