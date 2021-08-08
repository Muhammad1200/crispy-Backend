'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("leads", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("reports", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("actions", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("leads", "salesCyclePhaseId", {
      type: Sequelize.INTEGER,
      references: {
        model: "salesCyclePhases",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("reports", "leadId", {
      type: Sequelize.INTEGER,
      references: {
        model: "leads",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("actions", "leadId", {
      type: Sequelize.INTEGER,
      references: {
        model: "leads",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }),
    await queryInterface.addColumn("leads", "contactId", {
      type: Sequelize.INTEGER,
      references: {
        model: "contacts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
},

down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("leads", "userId");
    await queryInterface.removeColumn("reports", "userId");
    await queryInterface.removeColumn("actions", "userId");
    await queryInterface.removeColumn("leads", "salesCyclePhaseId");
    await queryInterface.removeColumn("reports", "leadId");
    await queryInterface.removeColumn("actions", "leadId");
    await queryInterface.removeColumn("leads", "contactId");
  }
};
