'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    colour: DataTypes.STRING,
    vendor: DataTypes.STRING,
    employee: DataTypes.STRING,
    location: DataTypes.STRING,
    objectId: DataTypes.STRING,
    description: DataTypes.STRING,
    endDt: DataTypes.DATE,
    startDt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};