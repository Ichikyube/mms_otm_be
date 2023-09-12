'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DailyReport.init({
    notes: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdby: DataTypes.STRING,
    depchangeby: DataTypes.STRING,
    depcreateby: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DailyReport',
  });
  return DailyReport;
};