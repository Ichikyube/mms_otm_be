'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.BLOB
      },
      name: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      reminder: {
        type: Sequelize.NUMBER
      },
      issueDt: {
        type: Sequelize.DATE
      },
      checkingDt: {
        type: Sequelize.DATE
      },
      expiredDt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('certificates');
  }
};