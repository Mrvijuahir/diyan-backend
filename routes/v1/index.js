const router = require("express").Router();

router.use("/auth", require("./user.routes"));
router.use("/role", require("./role.routes"));
module.exports = router;
