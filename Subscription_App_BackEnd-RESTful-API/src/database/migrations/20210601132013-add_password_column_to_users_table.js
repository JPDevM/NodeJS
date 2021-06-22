'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* Add a column */
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING(),
      after: 'email',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /* Remove a column */
    await queryInterface.removeColumn('users', 'password');
  },
};
