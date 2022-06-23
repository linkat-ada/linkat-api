const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.get("/", middleware.isAuthenticated, controller.getQR)
router.post("/", middleware.isAuthenticated, controller.scanQR)



module.exports = router