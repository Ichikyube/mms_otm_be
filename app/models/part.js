'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class part extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  part.init({
    moq: DataTypes.STRING,
    uom: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    remarks: DataTypes.STRING,
    storage: DataTypes.STRING,
    category: DataTypes.STRING,
    itemcode: DataTypes.STRING,
    type: DataTypes.STRING,
    quantity: DataTypes.NUMBER,
    department: DataTypes.STRING,
    description: DataTypes.STRING,
    detailcategory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'part',
  });
  return part;
};