'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qrcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      qrcodes.belongsTo(models.users);
      qrcodes.belongsToMany(models.links, {
        through: "qrlinks",
        foreignKey: "qrId"
      })
    }
  }
  qrcodes.init({
    userId: DataTypes.INTEGER,
    QRlink: DataTypes.TEXT,
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'qrcodes',
  });
  return qrcodes;
};