'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles, { foreignKey: "id"});
      users.hasOne(models.usersprofile, { foreignKey: "userId"});
      users.hasMany(models.links, { foreignKey: "userId"});
      users.hasOne(models.QRcodes, { foreignKey: "userId"});
    }
  }
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};