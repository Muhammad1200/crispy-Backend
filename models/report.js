'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      report.belongsTo(models.user)
      report.belongsTo(models.lead)
    }
  };
  report.init({
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'report',
  });
  return report;
};