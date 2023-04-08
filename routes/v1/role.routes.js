const router = require("express").Router();
const {
	addRole,
	getRole,
	updateRole,
	getRoleById,
	deleteRole,
} = require("../../controllers/role.controller");
const {
	addRoleJoiSchema,
	updateRoleJoiSchema,
} = require("../../validations/role");
const { validate } = require("../../middlewares");

router.post("/addrole", validate(addRoleJoiSchema), addRole);
router.get("/getrole", getRole);
router.get("/getrole/:id", getRoleById);
router.put("/updaterole/:id", validate(updateRoleJoiSchema), updateRole);
router.delete("/deleterole/:id", deleteRole);
module.exports = router;
