'use strict';

const faker = require('faker'); // faker.js - generate massive amounts of fake data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakePromotion = [];

    for (let i = 1; i <= 50; i++) {
      fakePromotion.push({
        isActive: 1, // FF8822
        type: 'cuponCode',
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        urlPath: faker.internet.url(),
        description: faker.lorem.sentence(),
        userId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('promotions', fakePromotion, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('promotions', null, {});
  },
};
