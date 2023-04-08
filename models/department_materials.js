const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const { DataTypes } = require("sequelize");

class DepartmentMaterials extends Model {
  static associate(models) {
    DepartmentMaterials.belongsTo(models.Departments, {
      foreignKey: "department_id",
      targetKey: "id",
    });
    DepartmentMaterials.belongsTo(models.Materials, {
      foreignKey: "department_id",
      targetKey: "id",
    });
  }
}

DepartmentMaterials.init(
  {
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
        key: "id",
      },
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "materials",
        key: "id",
      },
    },
  },
  getTableConfigs(sequelize, "department_materials")
);

module.exports = DepartmentMaterials;
