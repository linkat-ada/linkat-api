'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('linktypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "https://firebasestorage.googleapis.com/v0/b/linkat-a9527.appspot.com/o/images%2Fmain-image%2Flinkat-04.svg?alt=media&token=db25bbaf-c238-4900-a1e4-daf02598ac6b"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('linktypes');
  }
};