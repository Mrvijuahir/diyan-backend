const Joi = require("joi");

module.exports = {
  createJoiSchema: Joi.object().keys({
    role_id: Joi.number().positive().integer().required().label("Role id"),
    reporting_to: Joi.number()
      .positive()
      .integer()
      .required()
      .label("Reporting role id"),
    status: Joi.boolean().label("Status"),
  }),
  updateJoiSchema: Joi.object().keys({
    reporting_to: Joi.number().positive().integer().label("Reporting role id"),
    status: Joi.boolean().label("Status"),
  }),
};
