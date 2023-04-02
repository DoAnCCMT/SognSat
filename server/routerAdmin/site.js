const express = require("express");
const siteController = require("../controllerAdmin/SiteController");
const router = express.Router();

router.get("/", siteController.home);
//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
