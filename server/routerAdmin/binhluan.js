const express = require("express");
const binhluanAdminController = require("../controllerAdmin/BinhLuanAdminController ");
const router = express.Router();

router.get("/stored/:id", binhluanAdminController.storedBinhLuan);
router.put("/trangthai/:id", binhluanAdminController.changeStatus);

module.exports = router;
