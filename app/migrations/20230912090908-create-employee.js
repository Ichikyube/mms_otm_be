'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.DATE
      },
      code: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      lastname: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      dateJoined: {
        type: Sequelize.DATE
      },
      mainAddress: {
        type: Sequelize.STRING
      },
      secondPhone: {
        type: Sequelize.STRING
      },
      secondAddress: {
        type: Sequelize.STRING
      },
      identityNumber: {
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
    await queryInterface.dropTable('employees');
  }
};