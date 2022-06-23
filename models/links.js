'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      links.belongsTo(models.users, { foreignKey: "id"});
      links.belongsTo(models.linktypes, { foreignKey: "id"});
    }
  }
  links.init({
    userId: DataTypes.INTEGER,
    linkTypeId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'links',
  });
  return links;
};