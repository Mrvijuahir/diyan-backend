const { sequelize } = require("../configs/mysql");
const { Sequelize } = require("sequelize");
const db = {};

db.Admin = require("./admin");
db.Roles = require("./roles");
db.Employees = require("./employees");

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
