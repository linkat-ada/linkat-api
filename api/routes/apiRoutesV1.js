const express = require("express");
const router = express.Router();

router.use("/users", require("../lib/users/routes"));
router.use("/links", require("../lib/links/routes"));
router.use("/qrcodes", require("../lib/qrcodes/routes"));
router.use("/admins", require("../lib/admins/routes"));
router.use("/superadmin", require("../lib/superAdmins/routes"));


module.exports = router;
