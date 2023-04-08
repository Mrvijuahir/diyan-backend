const { Sequelize, Model, DataTypes } = require("sequelize");
const _ = require("lodash");

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USERNAME,
  process.env.MYSQL_DB_PASSWORD,
  {
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    pool: {
      min: 0,
      max: 5,
      idle: 10000,
      acquire: 60000,
      evict: 1000,
    },
  }
);

const getTableConfigs = (sequelize, tableName = "", excludeFields = []) => {
  return _.omit(
    {
      timestamps: true,
      sequelize,
      tableName: tableName,
      paranoid: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    excludeFields
  );
};

module.exports = {
  sequelize,
  Model,
  getTableConfigs,
};
