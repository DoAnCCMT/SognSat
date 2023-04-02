const express = require("express");
const loginController = require("../controllerAdmin/LoginController");
const router = express.Router();

router.get("/", loginController.index);
router.get("/login", loginController.login);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
