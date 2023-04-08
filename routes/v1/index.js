const { verifyToken } = require("../../middlewares");

const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use(verifyToken);
router.use("/admin", require("./admin.routes"));
router.use("/role", require("./role.routes"));
router.use("/material", require("./material.routes"));
router.use("/department", require("./department.routes"));
router.use("/role-hierarchy", require("./role_hierarchy.routes"));
router.use("/employees", require("./employee.routes"));

module.exports = router;
