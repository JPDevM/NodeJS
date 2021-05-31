'use strict';

const faker = require('faker'); // faker.js - generate massive amounts of fake data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeUsers = [];

    for (let i = 1; i <= 50; i++) {
      fakeUsers.push({
        firstName: faker.name.firstName(), // Caitlyn
        lastName: faker.name.lastName(), // Kerluke
        email: faker.internet.email(), // Rusty@arne.info
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
