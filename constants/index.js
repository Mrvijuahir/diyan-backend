module.exports = {
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin",
  },
  STOCK_TRANSACTION_TYPES: {
    INWARDING: "InWarding",
    OUTWARDING: "OutWarding",
  },
  MODULE_LIST: {
    dashboard: ["read", "create", "update"],
    manage_employee: {
      role: ["read", "create", "update"],
      employee: ["read", "create", "update"],
      hierarchy: ["read", "create", "update"],
    },
    manage_material: ["read", "create", "update"],
    manage_department: ["read", "create", "update"],
    manage_stocks: ["read", "create", "update"],
  },
  getMSTAttributeList: (type) => {
    switch (type) {
      case "InWarding":
        return [
          "id",
          "date",
          "material_id",
          "opening_stock",
          "receive_qty",
          "total_opening_stock",
          "remark",
          "created_at",
        ];
      case "OutWarding":
        return [
          "id",
          "date",
          "material_id",
          "total_opening_stock",
          "today_consumption",
          "to_date_consumption",
          "closing_stock",
          "remark",
          "created_at",
        ];
      default:
        return [
          "id",
          "date",
          "material_id",
          "opening_stock",
          "receive_qty",
          "total_opening_stock",
          "today_consumption",
          "to_date_consumption",
          "closing_stock",
          "remark",
          "stock_transaction_type",
          "created_at",
        ];
    }
  },
  getRolesAttributeList: (type = "") => {
    switch (type) {
      case "dropdown":
        return ["id", "role_name"];
      default:
        return ["id", "role_name", "status", "created_at"];
    }
  },
  getMaterialsAttributeList: (type = "") => {
    switch (type) {
      case "dropdown":
        return ["id", "material_name"];
      default:
        return ["id", "material_name", "status", "created_at"];
    }
  },
  getRoleHierarchyAttributeList: (type = "") => {
    switch (type) {
      default:
        return ["id", "role_id", "reporting_to", "status", "created_at"];
    }
  },
  getDepartmentsAttributeList: (type = "") => {
    switch (type) {
      case "dropdown":
        return ["id", "department_name"];
      default:
        return ["id", "department_name", "status", "created_at"];
    }
  },
  getEmployeeAttributeList: (type = "") => {
    switch (type) {
      case "dropdown":
        return ["id", "name"];
      default:
        return [
          "id",
          "name",
          "email",
          "personal_number",
          "office_number",
          "reporting_to",
          "role_id",
          "dob",
          "date_of_joining",
          "emergency_contact_number",
          "blood_group",
          "p_address",
          "p_state",
          "p_city",
          "p_area",
          "p_pincode",
          "is_temp_address_same",
          "t_address",
          "t_state",
          "t_city",
          "t_area",
          "t_pincode",
          "created_at",
        ];
    }
  },
};
