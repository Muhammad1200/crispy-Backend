'use strict';
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Daan Klein",
        email: "Daan@kleinenkok.nl",
        password: bcrypt.hashSync("test1234", 10),
        phone: 1234567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Merijn Kok",
        email: "Merijn@kleinenkok.nl",
        password: bcrypt.hashSync("test1234", 10),
        phone: 1234567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teun",
        email: "Teun@kleinenkok.nl",
        password: bcrypt.hashSync("test1234", 10),
        phone: 1234567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {})
  }
};
