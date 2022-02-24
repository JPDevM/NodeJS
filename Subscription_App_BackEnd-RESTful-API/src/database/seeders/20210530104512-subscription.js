'use strict';

const faker = require('faker'); // faker.js - generate massive amounts of fake data.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeSubscription = [];

    for (let i = 1; i <= 50; i++) {
      fakeSubscription.push({
        isActive: 1, // FF8822
        isPopular: 0,
        name: faker.company.companyName(), // Netflix
        logo: faker.image.imageUrl(), // no-image.png
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        firstPayment: faker.date.past(),
        recurrency: 'monthly',
        longDate: faker.date.future(),
        notification: 0,
        currency: faker.finance.currencyCode(),
        style: 'white',
        userId: i,
        colorId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('subscriptions', fakeSubscription, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions', null, {});
  },
};
