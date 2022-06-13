const express = require("express");
const router = express.Router();
const userController = require("../controller")
const middleware = require('../../middleware')


router.post("/signup", userController.signup); //signup
router.post("/signin", userController.signin); //signin
router.patch("/updatepassword", middleware.isAuthenticated, userController.updatePassword); //updatepassword
router.patch("/updateusername", middleware.isAuthenticated, userController.updateUsername); //update username
router.patch("/updateemail", middleware.isAuthenticated, userController.updateEmail); //update email
router.put("/updateprofile", middleware.isAuthenticated, userController.updateProfile); //update profile nickname/bio
router.get("/", middleware.isAuthenticated, userController.getUserInfo); //get profileInfo
router.post("/logout", middleware.isAuthenticated, userController.logout); //logout
router.patch("/updateprofpic", middleware.isAuthenticated, userController.updateProfile); //upload and update photo
router.delete("/", middleware.isAuthenticated, userController.deleteUser); //delete user


module.exports = router;
