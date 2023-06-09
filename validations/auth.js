const Joi = require("joi");

module.exports = {
  loginJoiSchema: Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  }),
};
