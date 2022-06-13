'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QRcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QRcodes.belongsTo(models.users, { foreignKey: "id"});
    }
  }
  QRcodes.init({
    userId: DataTypes.INTEGER,
    QRlink: DataTypes.STRING,
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QRcodes',
  });
  return QRcodes;
};