'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersprofiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usersprofiles.belongsTo(models.users);
    }
  }
  usersprofiles.init({
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bgPic: DataTypes.STRING,
    bio: DataTypes.STRING,
    darkMode: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usersprofiles',
  });
  return usersprofiles;
};