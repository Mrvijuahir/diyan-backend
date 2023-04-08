const router = require("express").Router();
const {
  create,
  update,
  getRoleHierarchy,
} = require("../../controllers/role_hierarchy.controller");
const {
  createJoiSchema,
  updateJoiSchema,
} = require("../../validations/role_hierarchy");
const { validate } = require("../../middlewares");

router.route("/").post(validate(createJoiSchema), create).get(getRoleHierarchy);
router.patch("/:id", validate(updateJoiSchema), update);

module.exports = router;
