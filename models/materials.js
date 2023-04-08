const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Materials extends Model {
	// static associate(models) {
	// 	Roles.hasMany(models.Employees, {
	// 		foreignKey: {
	// 			name: "role_id",
	// 			allowNull: true,
	// 		},
	// 		targetKey: "id",
	// 	});
	// 	Roles.hasOne(models.RoleHierarchy, {
	// 		as: "role_hierarchy",
	// 		foreignKey: "role_id",
	// 		sourceKey: "id",
	// 	});
	// 	Roles.hasMany(models.RoleHierarchy, {
	// 		as: "reporting_hierarchy",
	// 		foreignKey: "reporting_to",
	// 		sourceKey: "id",
	// 	});
	// }
}

Materials.init(
	{
		material_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	getTableConfigs(sequelize, "materials")
);

module.exports = Materials;
