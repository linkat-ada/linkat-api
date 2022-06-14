const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.post("/", middleware.isAuthenticated, controller.createQr)



module.exports = router