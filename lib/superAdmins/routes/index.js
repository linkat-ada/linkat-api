const express = require("express");
const router = express.Router();
const superAdminController = require("../controller")
const middleware = require('../../middleware')

router.post("/signup", middleware.isAuthenticated, middleware.isSuperAdmin, superAdminController.signup); // create admin
router.delete("/delete/:id", middleware.isAuthenticated, middleware.isSuperAdmin, superAdminController.deleteAdmin); // delete admin


// make middleware for the superAdmin
// delete admins in the service and the controller


module.exports = router;
