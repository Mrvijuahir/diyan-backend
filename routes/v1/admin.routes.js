const router = require("express").Router();
const { create } = require("../../controllers/admin.controller");
const { createJoiSchema } = require("../../validations/admin");
const { validate } = require("../../middlewares");

router.post("/create", validate(createJoiSchema), create);

module.exports = router;
