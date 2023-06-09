const { DataTypes } = require("sequelize");
const { sequelize, Model, getTableConfigs } = require("../configs/mysql");
const bcrypt = require("bcryptjs");

class Employees extends Model {
  static associate(models) {
    Employees.belongsTo(models.Roles, {
      foreignKey: {
        name: "role_id",
        allowNull: true,
      },
      targetKey: "id",
    });
    Employees.belongsTo(models.Employees, {
      as: "reporting_employee",
      foreignKey: {
        name: "reporting_to",
        allowNull: true,
      },
      targetKey: "id",
    });
    Employees.hasMany(models.Employees, {
      as: "reporter_employees",
      foreignKey: {
        name: "reporting_to",
        allowNull: true,
      },
      sourceKey: "id",
    });
  }
  // verify password
  isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

Employees.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    personal_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    office_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reporting_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "employees",
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
    },
    // department_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "departments",
    //     key: "id",
    //   },
    // },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date_of_joining: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    emergency_contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blood_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    p_pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_temp_address_same: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    t_address: {
      type: DataTypes.STRING,
    },
    t_state: {
      type: DataTypes.STRING,
    },
    t_city: {
      type: DataTypes.STRING,
    },
    t_area: {
      type: DataTypes.STRING,
    },
    t_pincode: {
      type: DataTypes.STRING,
    },
  },
  getTableConfigs(sequelize, "employees")
);

module.exports = Employees;
