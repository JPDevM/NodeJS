'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* Create table */
    await queryInterface.createTable('promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.INTEGER, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      urlPath: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: Sequelize.INTEGER, // FK user
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
    await queryInterface.dropTable('promotions');
  },
};
