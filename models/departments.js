const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Departments extends Model {
	static associate(models) {
		Departments.belongsToMany(models.Materials, {
			through: models.MaterialsDepartments,
			foreignKey: "department_id",
			sourceKey: "id",
			targetKey: "id",
		});
	}
}

Departments.init(
	{
		department_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	getTableConfigs(sequelize, "departments")
);

module.exports = Departments;
