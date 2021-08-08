'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("reports", [
      {
        id: 1,
        note: `Nadat we vorige week een test doosje hebben afgeleverd, 
        heb ik gister met Thor gesproken.
        Hij vindt het een mooi product maar maakt ze liever zelf. 
        Over een half jaar weer proberen`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        leadId: 1
      },
      {
        id: 2,
        note: `Scheepskameel binnen gestapt en kennis gemaakt met de chef.
        Aardige gozer, hij heet Tom en gaat ook over de borrel kaart. 
        volgende week even langs met een test doosje`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        leadId: 2
      },
      {
        id: 3,
        note: `test doosje afgelverd bij Cafe Comodo, Chef was niet aanwezig`,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        leadId: 4
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reports", null, {});
  }
};
