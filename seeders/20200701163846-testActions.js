'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("actions", [
      {
        id: 1,
        action: "Breng een test doosje lans",
        due_date: new Date(),
        note: "De Chef heet Tom",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        leadId: 2
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("actions", null, {})
  }
};
