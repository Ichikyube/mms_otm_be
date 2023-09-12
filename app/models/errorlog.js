'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class errorlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  errorlog.init({
    objectId: DataTypes.STRING,
    error_object: DataTypes.STRING,
    error_message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'errorlog',
  });
  return errorlog;
};