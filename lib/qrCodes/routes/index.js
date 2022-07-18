const express = require("express")
const router = express.Router()
const middleware = require("../../middleware")
const controller = require("../controller")

router.post("/", middleware.isAuthenticated, controller.createQR);
router.get("/:uuid", controller.getLinkByQR);
router.post("/qrlinks", middleware.isAuthenticated, controller.createQRLinks);



module.exports = router