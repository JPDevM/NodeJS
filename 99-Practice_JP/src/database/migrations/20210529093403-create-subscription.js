'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscriptions', {
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
      isPopular: {
        type: Sequelize.INTEGER, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // MUST have a value. Set defaultValue
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'no-image.png',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      firstPayment: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      recurrency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      longDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      notification: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: Sequelize.INTEGER, // true - false
        allowNull: false, // MUST have a value. Set defaultValue
        defaultValue: 'eur',
      },
      style: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: Sequelize.INTEGER, // FK user
        allowNull: true,
        defaultValue: null,
      },
      colorId: {
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
    await queryInterface.dropTable('subscriptions');
  },
};
