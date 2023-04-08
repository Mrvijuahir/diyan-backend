const router = require("express").Router();
const { signup, login } = require("../../controllers/user.controller");
const {
  signupJoiSchema,
  loginJoiSchema,
} = require("../../validations/user.auth");
const { validate } = require("../../middlewares");

router.post("/signup", validate(signupJoiSchema), signup);
router.post("/login", validate(loginJoiSchema), login);

module.exports = router;
