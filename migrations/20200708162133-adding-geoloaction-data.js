'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("leads", "lat", {
      type: Sequelize.FLOAT,
      allowNull: false
    })
    await queryInterface.addColumn("leads", "lng", {
        type: Sequelize.FLOAT,
        allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("leads", "lat");
    await queryInterface.removeColumn("leads", "lng");
  }
};
