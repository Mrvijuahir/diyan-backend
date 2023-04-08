const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");

class RoleHierarchy extends Model {
  static associate(models) {
    RoleHierarchy.belongsTo(models.Roles, {
      as: "role",
      foreignKey: "role_id",
      targetKey: "id",
    });
    RoleHierarchy.belongsTo(models.Roles, {
      as: "reporting_role",
      foreignKey: "reporting_to",
      targetKey: "id",
    });
  }
}

RoleHierarchy.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    reporting_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  getTableConfigs(sequelize, "role_hierarchies")
);

module.exports = RoleHierarchy;
