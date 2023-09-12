'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moq: {
        type: Sequelize.STRING
      },
      uom: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      storage: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      itemcode: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.NUMBER
      },
      department: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      detailcategory: {
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
    await queryInterface.dropTable('parts');
  }
};