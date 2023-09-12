'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  certificate.init({
    file: DataTypes.BLOB,
    name: DataTypes.STRING,
    notes: DataTypes.STRING,
    vendor: DataTypes.STRING,
    filename: DataTypes.STRING,
    reminder: DataTypes.NUMBER,
    issueDt: DataTypes.DATE,
    checkingDt: DataTypes.DATE,
    expiredDt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'certificate',
  });
  return certificate;
};