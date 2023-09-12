'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.ARRAY
      },
      type: {
        type: Sequelize.STRING
      },
      follow: {
        type: Sequelize.ARRAY
      },
      number: {
        type: Sequelize.NUMBER
      },
      endDt: {
        type: Sequelize.STRING
      },
      related: {
        type: Sequelize.STRING
      },
      assignTo: {
        type: Sequelize.ARRAY
      },
      objectId: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      repeated: {
        type: Sequelize.STRING
      },
      taskName: {
        type: Sequelize.STRING
      },
      checklist: {
        type: Sequelize.ARRAY
      },
      startDt: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      related_reference: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tasks');
  }
};