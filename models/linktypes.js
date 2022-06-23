'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class linktypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      linktypes.hasMany(models.links, { foreignKey: "linkTypeId"});
    }
  }
  linktypes.init({
    type: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'linktypes',
  });
  return linktypes;
};