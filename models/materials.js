const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Materials extends Model {
  static associate(models) {
    Materials.belongsToMany(models.Departments, {
      through: models.MaterialsDepartments,
      foreignKey: "material_id",
      sourceKey: "id",
      targetKey: "id",
    });
    Materials.hasMany(models.MaterialStockTransactions, {
      foreignKey: "material_id",
      sourceKey: "id",
    });
  }
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
