const router = require("express").Router();
const {
	addMaterialJoiSchema,
	updateMaterialJoiSchema,
} = require("../../validations/material");
const {
	getMaterial,
	addMaterial,
	updateMaterial,
} = require("../../controllers/material.controller");
const { validate } = require("../../middlewares");

router
	.route("/")
	.post(validate(addMaterialJoiSchema), addMaterial)
	.get(getMaterial);
router.patch("/:id", validate(updateMaterialJoiSchema), updateMaterial);

module.exports = router;
