const Joi = require("joi");

module.exports = {
  signupJoiSchema: Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    confirm_password: Joi.ref("password"),
  }),
  loginJoiSchema: Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  }),
};
