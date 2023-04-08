const Joi = require("joi");

module.exports = {
  createJoiSchema: Joi.object().keys({
    name: Joi.string().required().label("Employee Name"),
    email: Joi.string().email().required().label("Email"),
    personal_number: Joi.string()
      .length(10)
      .required()
      .label("Personal number"),
    office_number: Joi.string().length(10).required().label("Office number"),
    reporting_to: Joi.number().integer().positive().label("Reporting to"),
    role_id: Joi.number().integer().positive().label("Role"),
    dob: Joi.string().required().label("Date of birth"),
    date_of_joining: Joi.string().required().label("Date of joining"),
    emergency_contact_number: Joi.string()
      .length(10)
      .required()
      .label("Emergency contact number"),
    blood_group: Joi.string().required().label("Blood group"),
    p_address: Joi.string().required().label("Permanent address"),
    p_state: Joi.string().required().label("Permanent state"),
    p_city: Joi.string().required().label("Permanent city"),
    p_area: Joi.string().required().label("Permanent area"),
    p_pincode: Joi.string().required().label("Permanent pincode"),
    is_temp_address_same: Joi.boolean().label("Is temparay address is same"),
    t_address: Joi.string().required().label("Temporary address"),
    t_state: Joi.string().required().label("Temporary state"),
    t_city: Joi.string().required().label("Temporary city"),
    t_area: Joi.string().required().label("Temporary area"),
    t_pincode: Joi.string().required().label("Temporary pincode"),
  }),
  updateJoiSchema: Joi.object().keys({
    name: Joi.string().label("Employee Name"),
    email: Joi.string().email().label("Email"),
    personal_number: Joi.string()
      .length(10)

      .label("Personal number"),
    office_number: Joi.string().length(10).label("Office number"),
    reporting_to: Joi.number().integer().positive().label("Reporting to"),
    role_id: Joi.number().integer().positive().label("Role"),
    dob: Joi.string().label("Date of birth"),
    date_of_joining: Joi.string().label("Date of joining"),
    emergency_contact_number: Joi.string()
      .length(10)

      .label("Emergency contact number"),
    blood_group: Joi.string().label("Blood group"),
    p_address: Joi.string().label("Permanent address"),
    p_state: Joi.string().label("Permanent state"),
    p_city: Joi.string().label("Permanent city"),
    p_area: Joi.string().label("Permanent area"),
    p_pincode: Joi.string().label("Permanent pincode"),
    is_temp_address_same: Joi.boolean().label("Is temparay address is same"),
    t_address: Joi.string().label("Temporary address"),
    t_state: Joi.string().label("Temporary state"),
    t_city: Joi.string().label("Temporary city"),
    t_area: Joi.string().label("Temporary area"),
    t_pincode: Joi.string().label("Temporary pincode"),
  }),
};
