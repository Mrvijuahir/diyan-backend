const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Materials extends Model {
  static associate(models) {
    Materials.belongsToMany(models.Departments, {
      through: models.DepartmentMaterials,
      foreignKey: "material_id",
      targetKey: "id",
      sourceKey: "id",
    });
  }
}

Materials.init(
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
  getTableConfigs(sequelize, "materials")
);

module.exports = Materials;
