const router = require("express").Router();
const { addRole, getRole } = require("../../controllers/role.controller");
const { addRoleJoiSchema } = require("../../validations/role");
const { validate } = require("../../middlewares");

router.post("/addrole", validate(addRoleJoiSchema), addRole);
router.get("/getrole/:id?", getRole);
module.exports = router;
