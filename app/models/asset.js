'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  asset.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.STRING,
    number: DataTypes.STRING,
    serial: DataTypes.STRING,
    status: DataTypes.STRING,
    assetid: DataTypes.STRING,
    picture: DataTypes.STRING,
    categories: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'asset',
  });
  return asset;
};