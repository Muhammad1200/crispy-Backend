'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("salesCyclePhases", [
      {
        name: "Lead in",
        description: "Nog geen contact gemaakt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Contact gemaakt",
        description: "Het eerste contact is gemaakt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ballen proeven",
        description: "Een proef doosje ballen is geleverd, en het poduct wordt geproefd",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Deal gesloten",
        description: "De ballen staan op de kaart",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Afgewezen",
        description: "Het product is afgewezen",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("salesCyclePhases", null, {});
  }
};
