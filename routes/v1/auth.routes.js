const router = require("express").Router();
const { login } = require("../../controllers/auth.controller");
const { loginJoiSchema } = require("../../validations/auth");
const { validate } = require("../../middlewares");

router.post("/login", validate(loginJoiSchema), login);

module.exports = router;
