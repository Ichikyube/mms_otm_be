'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  taskfile.init({
    filename: DataTypes.STRING,
    fileattach: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'taskfile',
  });
  return taskfile;
};