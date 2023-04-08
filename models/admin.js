const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const bcrypt = require("bcryptjs");

class Admin extends Model {
  // verify password
  isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

Admin.init(
  {
    email: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
  },
  getTableConfigs(sequelize, "admins")
);

module.exports = Admin;
