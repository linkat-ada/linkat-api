const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.post("/", middleware.isAuthenticated, controller.createQR);
router.get("/", middleware.isAuthenticated, controller.getQR);
router.post("/qrlinks", middleware.isAuthenticated, controller.createQRLinks);

//router.post("/", middleware.isAuthenticated, controller.scanQR)



module.exports = router