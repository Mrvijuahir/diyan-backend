const Joi = require("joi");

module.exports = {
  createJoiSchema: Joi.object().keys({}),
  updateJoiSchema: Joi.object().keys({}),
  deleteJoiSchema: Joi.object().keys({}),
  getEmployeesJoiSchema: Joi.object().keys({}),
  getEmployeeJoiSchema: Joi.object().keys({}),
};
