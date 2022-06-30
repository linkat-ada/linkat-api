const express = require("express");
const router = express.Router();
const superAdminController = require("../controller")
const middleware = require('../../middleware')

router.post("/createadmin", middleware.isAuthenticated, middleware.isSuperAdmin, superAdminController.createAdmin); // create admin
router.delete("/delete/:id", middleware.isAuthenticated, middleware.isSuperAdmin, superAdminController.deleteAdmin); // delete admin
router.patch("/users/:id", middleware.isAuthenticated, middleware.isSuperAdmin, superAdminController.changeUserRole); // change role



module.exports = router;
