'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'users', 
      'password', 
      { 
        type: Sequelize.STRING, 
        after: 'email', 
        defaultValue: '$2a$11$jbkf5i3Ly3lGROrQ/4Z18uhHv8Wmlad1yJkcA6pV9wgkwQdJo5j92' // 123
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'password');
  }
};
