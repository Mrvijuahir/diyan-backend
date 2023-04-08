const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const bcrypt = require("bcryptjs");
const { USER_ROLES } = require("../constants");

class Users extends Model {
  // verify password
  isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

Users.init(
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
    role: {
      type: DataTypes.ENUM(...Object.values(USER_ROLES)),
      defaultValue: "user",
    },
  },
  getTableConfigs(sequelize, "users")
);

module.exports = Users;
