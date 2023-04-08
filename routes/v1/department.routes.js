const router = require("express").Router();
const {
	addDepartmentJoiSchema,
	updateDepartmentJoiSchema,
} = require("../../validations/department");
const { validate } = require("../../middlewares");
const {
	addDepartments,
	getDepartments,
	updateDepartment,
} = require("../../controllers/department.controller");
router
	.route("/")
	.post(validate(addDepartmentJoiSchema), addDepartments)
	.get(getDepartments);
router.patch("/:id", validate(updateDepartmentJoiSchema), updateDepartment);
module.exports = router;
