const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Roles extends Model {}

Roles.init(
	{
		role_name: {
			type: DataTypes.STRING(75),
			allowNull: false,
			unique: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	getTableConfigs(sequelize, "roles")
);

module.exports = Roles;
