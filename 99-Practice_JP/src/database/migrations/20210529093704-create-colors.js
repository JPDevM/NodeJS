'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.Integer, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      type: {
        type: Sequelize.String,
        allowNull: true,
        defaultValue: null,
      },
      startDate: {
        type: Sequelize.Date,
        allowNull: true,
        defaultValue: null,
      },
      endDate: {
        type: Sequelize.Date,
        allowNull: true,
        defaultValue: null,
      },
      urlPath: {
        type: Sequelize.String,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: Sequelize.String,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: Sequelize.Integer, // FK user
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
    await queryInterface.dropTable('colors');
  },
};
