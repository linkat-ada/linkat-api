'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invalidTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invalidTokens.init({
    tokens: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invalidTokens',
  });
  return invalidTokens;
};