const Joi = require("joi");

module.exports = {
  createJoiSchema: Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    confirm_password: Joi.ref("password"),
  }),
};
