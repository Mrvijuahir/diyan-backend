const router = require("express").Router();
const {
  create,
  update,
  destroy,
  getEmployee,
  getEmployees,
  getRoleWiseEmployees,
} = require("../../controllers/employee.controller");
const {
  createJoiSchema,
  updateJoiSchema,
  deleteJoiSchema,
  getEmployeeJoiSchema,
  getEmployeesJoiSchema,
} = require("../../validations/employee");

router.get("/role-wise", getRoleWiseEmployees);

router
  .route("/")
  .get(validator(getEmployeesJoiSchema), getEmployees)
  .post(validator(createJoiSchema), create);

router
  .route("/:id")
  .get(validator(getEmployeeJoiSchema), getEmployee)
  .patch(validator(updateJoiSchema), update)
  .delete(validator(deleteJoiSchema), destroy);

module.exports = router;