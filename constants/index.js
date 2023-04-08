module.exports = {
	USER_ROLES: {
		USER: "user",
		ADMIN: "admin",
	},
	MODULE_LIST: {
		DASHBOARD: ["read", "create", "update"],
		MANAGE_EMPLOYEE: {
			ROLE: ["read", "create", "update"],
			EMPLOYEE: ["read", "create", "update"],
			HIERARCHY: ["read", "create", "update"],
		},
		MANAGE_MATERIAL: ["read", "create", "update"],
		MANAGE_DEPARTMENT: ["read", "create", "update"],
		MANAGE_STOCKS: {
			INWARDING: ["read", "create", "update"],
			OUTWARDING: ["read", "create", "update"],
		},
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
