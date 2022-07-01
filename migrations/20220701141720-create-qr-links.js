'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('qrlinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qrId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'qrcodes'
          },
          key: 'id'
        },
      },
      linkId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'links'
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('qrLinks');
  }
};