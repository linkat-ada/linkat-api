const express = require("express");
const router = express.Router();
const adminController = require("../controller")
const middleware = require('../../middleware')

router.post("/signin", adminController.signin); // sign in
router.get("/users", middleware.isAuthenticated , middleware.isAdmin , adminController.getUsers); // get all users
router.get("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.getUser ); // get user info and links by id
router.delete("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteUsers);  // delete user
router.patch("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.editUser); // edit user
router.delete("/links/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteLink); // delete links 
router.post("/signup", middleware.isAuthenticated, middleware.isAdmin, adminController.createUser); // create users
router.patch("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.changeUser); // change role
router.post("/linkstype", middleware.isAuthenticated, middleware.isAdmin, adminController.addLinkType); // add link types
router.patch("/linkstype", middleware.isAuthenticated, middleware.isAdmin, adminController.editLinkType);  // edit link type
router.patch("/linksicon", middleware.isAuthenticated, middleware.isAdmin , adminController.editLinkIcon); // edit link icon
router.put("/", middleware.isAuthenticated, middleware.isAdmin, adminController.editAdmin); // edit admin info
router.get("/", middleware.isAuthenticated, middleware.isAdmin, adminController.getAdmins); // get all admins
router.delete("/", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteAdmin); // delete own admin
router.post("/logout", middleware.isAuthenticated, middleware.isAdmin, adminController.logout ); // logout


module.exports = router;
