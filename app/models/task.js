'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    tags: DataTypes.ARRAY,
    type: DataTypes.STRING,
    follow: DataTypes.ARRAY,
    number: DataTypes.NUMBER,
    endDt: DataTypes.STRING,
    related: DataTypes.STRING,
    assignTo: DataTypes.ARRAY,
    priority: DataTypes.STRING,
    repeated: DataTypes.STRING,
    taskName: DataTypes.STRING,
    checklist: DataTypes.ARRAY,
    startDt: DataTypes.DATE,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    related_reference: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};