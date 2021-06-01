'use strict';

const faker = require('faker'); // faker.js - generate massive amounts of fake data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeColors = [];

    for (let i = 1; i <= 50; i++) {
      fakeColors.push({
        colorHexa: faker.internet.color(), // FF8822
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('colors', fakeColors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {});
  },
};
