const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/role", require("./role.routes"));
router.use("/material", require("./material.routes"));
router.use("/role-hierarchy", require("./role_hierarchy.routes"));
router.use("/employees", require("./employee.routes"));
router.use("/admin", require("./admin.routes"));

module.exports = router;
