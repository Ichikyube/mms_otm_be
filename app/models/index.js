"use strict";

import fs from "fs";
import path from "path";
import Sequelize, { DataTypes } from "sequelize";
import basename from "path";
import __dirname from "../config/path.config.js";
import databaseURI from "../config/db.config.js"; // import config from "../config/config.js";

const db = {};

const sequelize = new Sequelize(databaseURI);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(async (file) => {
    const modulePath = `file://${__dirname}/${file}`;
    const model = import(modulePath, (sequelize, DataTypes));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
