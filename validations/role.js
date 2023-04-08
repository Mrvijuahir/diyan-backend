const Joi = require("joi");

module.exports = {
  addRoleJoiSchema: Joi.object().keys({
    role_name: Joi.string().required().label("Role Name"),
    status: Joi.boolean().label("Status"),
  }),
  updateRoleJoiSchema: Joi.object().keys({
    role_name: Joi.string().label("Role Name"),
    status: Joi.boolean().label("Status"),
  }),
};
