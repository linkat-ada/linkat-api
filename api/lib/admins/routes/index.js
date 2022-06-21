const express = require("express");
const router = express.Router();
const adminController = require("../controller")
const userController = require("../../users/controller")
const middleware = require('../../middleware')

router.post("/signin", adminController.signin); // sign in           DONE
router.get("/users", middleware.isAuthenticated , middleware.isAdmin , adminController.getUsers); // get all users
router.get("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.getUser ); // get user info and links by id
router.delete("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteUser);  // delete user    
router.patch("/activity/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.toggleActivity); // change to or from active
router.delete("/links/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteLink); // delete links
router.post("/linkstype", middleware.isAuthenticated, middleware.isAdmin, adminController.addLinkType); // add link types
router.patch("/linkstype/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.editLinkType);  // edit link type
router.patch("/linksicon/:id", middleware.isAuthenticated, middleware.isAdmin , adminController.editLinkIcon); // edit link icon
router.put("/", middleware.isAuthenticated, middleware.isAdmin, adminController.editAdmin); // edit admin info
router.get("/", middleware.isAuthenticated, middleware.isAdmin, adminController.getAdmins); // get all admins
router.post("/logout", middleware.isAuthenticated, userController.logout ); // logout


module.exports = router;
