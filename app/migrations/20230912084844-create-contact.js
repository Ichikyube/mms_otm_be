'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.BLOB
      },
      gender: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      prefix: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.STRING
      },
      phone_1: {
        type: Sequelize.STRING
      },
      phone_2: {
        type: Sequelize.STRING
      },
      phone_3: {
        type: Sequelize.STRING
      },
      is_agent: {
        type: Sequelize.BOOLEAN
      },
      lastname: {
        type: Sequelize.STRING
      },
      objectId: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      id_number: {
        type: Sequelize.STRING
      },
      is_vendor: {
        type: Sequelize.BOOLEAN
      },
      photoname: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING
      },
      tax_number: {
        type: Sequelize.STRING
      },
      birth_place: {
        type: Sequelize.STRING
      },
      is_supplier: {
        type: Sequelize.BOOLEAN
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      },
      is_activated: {
        type: Sequelize.BOOLEAN
      },
      emergency_name: {
        type: Sequelize.STRING
      },
      emergency_phone: {
        type: Sequelize.STRING
      },
      passport_number: {
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
    await queryInterface.dropTable('contacts');
  }
};