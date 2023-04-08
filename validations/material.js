const Joi = require("joi");

module.exports = {
	addMaterialJoiSchema: Joi.object().keys({
		material_name: Joi.string().required().label("Material Name"),
		status: Joi.boolean().label("Status"),
	}),
	updateMaterialJoiSchema: Joi.object().keys({
		material_name: Joi.string().label("Material Name"),
		status: Joi.boolean().label("Status"),
	}),
};
