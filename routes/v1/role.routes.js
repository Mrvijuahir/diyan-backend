const router = require("express").Router();
const {
  addRole,
  getRoles,
  updateRole,
} = require("../../controllers/role.controller");
const {
  addRoleJoiSchema,
  updateRoleJoiSchema,
} = require("../../validations/role");
const { validate } = require("../../middlewares");

router.route("/").post(validate(addRoleJoiSchema), addRole).get(getRoles);
router.patch("/:id", validate(updateRoleJoiSchema), updateRole);

module.exports = router;
