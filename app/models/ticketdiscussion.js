'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticketdiscussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticketdiscussion.init({
    discuss: DataTypes.STRING,
    datetime: DataTypes.STRING,
    messagetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ticketdiscussion',
  });
  return ticketdiscussion;
};