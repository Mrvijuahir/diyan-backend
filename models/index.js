const { sequelize } = require("../configs/mysql");
const { Sequelize } = require("sequelize");
const db = {};

db.Admin = require("./admin");
db.Roles = require("./roles");
db.RoleHierarchy = require("./role_hierarchy");
db.Employees = require("./employees");
db.Materials = require("./materials");
db.Departments = require("./departments");
db.MaterialsDepartments = require("./materialDepartment");
db.MaterialStockTransactions = require("./material_stock_transactions");

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
