'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact.init({
    email: DataTypes.STRING,
    photo: DataTypes.BLOB,
    gender: DataTypes.STRING,
    number: DataTypes.STRING,
    prefix: DataTypes.STRING,
    vendor: DataTypes.STRING,
    phone_1: DataTypes.STRING,
    phone_2: DataTypes.STRING,
    phone_3: DataTypes.STRING,
    is_agent: DataTypes.BOOLEAN,
    lastname: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    firstname: DataTypes.STRING,
    id_number: DataTypes.STRING,
    is_vendor: DataTypes.BOOLEAN,
    photoname: DataTypes.STRING,
    birth_date: DataTypes.STRING,
    middlename: DataTypes.STRING,
    tax_number: DataTypes.STRING,
    birth_place: DataTypes.STRING,
    is_supplier: DataTypes.BOOLEAN,
    is_verified: DataTypes.BOOLEAN,
    is_activated: DataTypes.BOOLEAN,
    emergency_name: DataTypes.STRING,
    emergency_phone: DataTypes.STRING,
    passport_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact',
  });
  return contact;
};