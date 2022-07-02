"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class qrlinks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qrlinks.init(
    {
      qrId: DataTypes.INTEGER,
      linkId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "qrlinks",
    }
  );
  return qrlinks;
};
