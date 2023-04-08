const { sequelize } = require("../configs/mysql");
const { Sequelize } = require("sequelize");
const db = {};

db.Users = require("./users");
db.Roles = require("./roles");
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
