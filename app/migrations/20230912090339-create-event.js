'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colour: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.STRING
      },
      employee: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      objectId: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      endDt: {
        type: Sequelize.DATE
      },
      startDt: {
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
    await queryInterface.dropTable('events');
  }
};