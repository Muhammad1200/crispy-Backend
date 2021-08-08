'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("contacts", [
      {
        id: 1,
        name: "Thor Lunstro",
        job_title: "chef",
        email: "Thor@fio.nl",
        phone: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Giel Kaagman",
        job_title: "chef",
        email: "Giel@Kaagman.nl",
        phone: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Chef Piet",
        job_title: "chef",
        email: "Chef@piet.nl",
        phone: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Barvrouw Lena Liers",
        job_title: "chef",
        email: "Lena@Festina.nl",
        phone: 12345678,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contacts", null, {});
  }
};
