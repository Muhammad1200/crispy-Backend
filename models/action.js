'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      action.belongsTo(models.user)
      action.belongsTo(models.lead)
    }
  };
  action.init({
    action: DataTypes.STRING,
    due_date: DataTypes.DATE,
    note: DataTypes.TEXT,
    done: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'action',
  });
  return action;
};