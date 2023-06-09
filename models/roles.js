const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class Roles extends Model {
  static associate(models) {
    Roles.hasMany(models.Employees, {
      foreignKey: {
        name: "role_id",
        allowNull: true,
      },
      targetKey: "id",
    });
    Roles.hasOne(models.RoleHierarchy, {
      as: "role_hierarchy",
      foreignKey: "role_id",
      sourceKey: "id",
    });
    Roles.hasMany(models.RoleHierarchy, {
      as: "reporting_hierarchy",
      foreignKey: "reporting_to",
      sourceKey: "id",
    });
  }
}

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
