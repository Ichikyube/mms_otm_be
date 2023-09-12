'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partinvin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  partinvin.init({
    purchase: DataTypes.STRING,
    quantity: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'partinvin',
  });
  return partinvin;
};