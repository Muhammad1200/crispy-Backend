"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lead.belongsTo(models.contact);
      lead.belongsTo(models.user);
      lead.hasMany(models.report);
      lead.belongsTo(models.salesCyclePhase);
      lead.hasMany(models.action);
    }
  }
  lead.init(
    {
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      associated_company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_phone: DataTypes.STRING,
      contact_person: DataTypes.STRING,
      company_address: DataTypes.STRING,
      supplier: DataTypes.STRING,
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "lead",
    }
  );
  return lead;
};
