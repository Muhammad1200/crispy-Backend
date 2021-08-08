'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      contact.hasMany(models.lead)
    }
  };
  contact.init({
    name: DataTypes.STRING,
    job_title: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact',
  });
  return contact;
};