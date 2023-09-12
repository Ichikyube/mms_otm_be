'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init({
    dob: DataTypes.DATE,
    code: DataTypes.STRING,
    notes: DataTypes.STRING,
    phone: DataTypes.STRING,
    photo: DataTypes.STRING,
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    dateJoined: DataTypes.DATE,
    mainAddress: DataTypes.STRING,
    secondPhone: DataTypes.STRING,
    secondAddress: DataTypes.STRING,
    identityNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};