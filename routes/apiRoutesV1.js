const express = require("express");
const router = express.Router();


router.use("/", (req, res) => {
    let welcomeHTML = `<h1>Welcome to the todo api v1</h1> <a target="_blank"  href="https://documenter.getpostman.com/view/20338203/UzQxM45n">Click here for the API Documentation</a>`;
    res.send(welcomeHTML);
});
router.use("/users", require("../lib/users/routes"));
router.use("/links", require("../lib/links/routes"));
router.use("/qrcodes", require("../lib/qrCodes/routes"));
router.use("/admins", require("../lib/admins/routes"));
router.use("/superadmins", require("../lib/superAdmins/routes"));
router.use("/subscribers", require("../lib/subscribers/routers"));


module.exports = router;
