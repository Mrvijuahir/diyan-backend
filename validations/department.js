const Joi = require("joi");

module.exports = {
	addDepartmentJoiSchema: Joi.object().keys({
		department_name: Joi.string().required().label("Department Name"),
		status: Joi.boolean().label("Status"),
		material: Joi.array().items(Joi.number().positive().integer()),
	}),
	updateDepartmentJoiSchema: Joi.object().keys({
		department_name: Joi.string().label("Department Name"),
		status: Joi.boolean().label("Status"),
		material: Joi.array().items(Joi.number().positive().integer()),
	}),
};
