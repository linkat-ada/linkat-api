const express = require("express");
const router = express.Router();
const adminController = require("../controller")
const userController = require("../../users/controller")
const middleware = require('../../middleware')
const userController = require("../../users/controller")

router.post("/signin", adminController.signin); // sign in           DONE
router.get("/users", middleware.isAuthenticated , middleware.isAdmin , adminController.getUsers); // get all users
router.get("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.getUser ); // get user info and links by id
<<<<<<< HEAD
<<<<<<< HEAD
router.delete("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteUser);  // delete user
=======
router.delete("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteUsers);  // delete user    
router.patch("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.toggleActivity); // change to or from active
>>>>>>> aa03ddf4c693ccf240749e7d1c5647a85168f31d
=======
router.delete("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteUsers);  // delete user    
router.patch("/users/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.toggleActivity); // change to or from active
>>>>>>> aa03ddf4c693ccf240749e7d1c5647a85168f31d
router.delete("/links/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.deleteLink); // delete links
router.post("/linkstype", middleware.isAuthenticated, middleware.isAdmin, adminController.addLinkType); // add link types
router.patch("/linkstype/:id", middleware.isAuthenticated, middleware.isAdmin, adminController.editLinkType);  // edit link type
router.patch("/linksicon/:id", middleware.isAuthenticated, middleware.isAdmin , adminController.editLinkIcon); // edit link icon
router.put("/", middleware.isAuthenticated, middleware.isAdmin, adminController.editAdmin); // edit admin info
router.get("/", middleware.isAuthenticated, middleware.isAdmin, adminController.getAdmins); // get all admins
router.post("/logout", middleware.isAuthenticated, userController.logout ); // logout


module.exports = router;
