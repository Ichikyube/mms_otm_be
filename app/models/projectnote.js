'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectnote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projectnote.init({
    notes: DataTypes.STRING,
    contents: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'projectnote',
  });
  return projectnote;
};

const projectNote = new ProjectNote({
  notes: "This is a note about a project.",
  contents: "The contents of the note.",
});

projectNote.save();