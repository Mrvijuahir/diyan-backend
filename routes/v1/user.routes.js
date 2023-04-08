const router = require("express").Router();
const { signup } = require("../../controllers");
const {
  signupJoiSchema,
  loginJoiSchema,
} = require("../../validations/user.auth");
const { validate } = require("../../middlewares");

router.post("/signup", validate(signupJoiSchema), signup);
router.post("/login", validate(loginJoiSchema), login);

module.exports = router;
