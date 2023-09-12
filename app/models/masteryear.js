'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masteryear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  masteryear.init({
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masteryear',
  });
  return masteryear;
};