'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersprofile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usersprofile.belongsTo(models.users, { foreignKey: "id"});
    }
  }
  usersprofile.init({
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bgPic: DataTypes.STRING,
    bio: DataTypes.STRING,
    darkMode: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usersprofile',
  });
  return usersprofile;
};