const express = require("express");
const router = express.Router();
const controller = require("../controller")
const middleware = require("../../middleware");


router.post("/", controller.setSubscribe)
router.get("/", middleware.isAdmin, controller.getSubscribes)





module.exports = router