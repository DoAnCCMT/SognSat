const express = require("express");
const taikhoanAdminController = require("../controllerAdmin/TaiKhoanAdminController");
const router = express.Router();

router.put("/trangthai/:id", taikhoanAdminController.changeStatus);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
