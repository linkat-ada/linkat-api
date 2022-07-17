const express = require("express");
const router = express.Router();
const middleware = require("../../middleware");
const linksController = require("../controller");

router.post("/", middleware.isAuthenticated, linksController.setLink);
router.get("/", middleware.isAuthenticated, linksController.getLinks);
//router.get("/:id", middleware.isAuthenticated, linksController.getLink);
router.get("/linkTypes", middleware.isAuthenticated, linksController.getLinkTypes);
router.delete("/:id", middleware.isAuthenticated, linksController.deleteLink);
router.put("/:id", middleware.isAuthenticated, linksController.updateLink);
router.patch("/reorder", middleware.isAuthenticated, linksController.reorderLinks);



module.exports = router;
