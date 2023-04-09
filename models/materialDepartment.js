const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class MaterialsDepartments extends Model {}

MaterialsDepartments.init(
  {
    material_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "materials",
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "id",
      },
    },
  },
  {
    ...getTableConfigs(sequelize, "materials_departments"),
    indexes: [{ unique: true, fields: ["material_id", "department_id"] }],
  }
);

module.exports = MaterialsDepartments;
