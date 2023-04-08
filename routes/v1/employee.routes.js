const router = require("express").Router();
const {
  create,
  update,
  getEmployees,
  getRoleWiseEmployees,
} = require("../../controllers/employee.controller");
const {
  createJoiSchema,
  updateJoiSchema,
  getEmployeesJoiSchema,
} = require("../../validations/employee");
const { validate } = require("../../middlewares");

router.get("/role-wise", getRoleWiseEmployees);

router
  .route("/")
  .get(validate(getEmployeesJoiSchema), getEmployees)
  .post(validate(createJoiSchema), create);

router.route("/:id").patch(validate(updateJoiSchema), update);

module.exports = router;
