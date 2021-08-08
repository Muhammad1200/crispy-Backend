"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class salesCyclePhase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      salesCyclePhase.hasMany(models.lead);
    }
  }
  salesCyclePhase.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "salesCyclePhase",
    }
  );
  return salesCyclePhase;
};
