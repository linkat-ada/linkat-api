"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usersprofiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:
          "https://firebasestorage.googleapis.com/v0/b/linkat-a9527.appspot.com/o/images%2Fmain-image%2FdeafultProfilePic.jpeg?alt=media&token=29cb23bb-e219-4039-966d-4f8bca484632",
      },
      bgPic: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "https://firebasestorage.googleapis.com/v0/b/linkat-a9527.appspot.com/o/images%2Fmain-image%2FDeafultBgImage.png?alt=media&token=161ec0aa-e2e1-4a27-8c7f-c5cc2b5f97d7"
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      darkMode: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usersprofiles");
  },
};
