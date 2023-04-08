const { sequelize } = require("../configs/mysql");

module.exports = {
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin",
  },
  getRolesAttributeList: (type = "") => {
    switch (type) {
      case "dropdown":
        return ["id", "name"];
      default:
        return ["id", "role_name", "status", "created_at"];
    }
  },
  getRoleHierarchyAttributeList: (type = "") => {
    switch (type) {
      default:
        return ["id", "role_id", "reporting_to", "status", "created_at"];
    }
  },
};
