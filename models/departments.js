const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Departments extends Model {
  static associate(models) {
    Departments.hasMany(models.Employees, {
      foreignKey: "department_id",
      sourceKey: "id",
    });
    Departments.belongsToMany(models.Materials, {
      through: models.DepartmentMaterials,
      foreignKey: "department_id",
      targetKey: "id",
      sourceKey: "id",
    });
  }
}

Departments.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
  },
  getTableConfigs(sequelize, "departments")
);

module.exports = Departments;
