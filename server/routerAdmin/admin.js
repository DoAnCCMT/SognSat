const express = require("express");
const adminController = require("../controllerAdmin/AdminController");
const router = express.Router();

router.get("/stored/tacgia", adminController.storedTacGia);
router.get("/stored/theloai", adminController.storedTheLoai);
router.get("/stored/taikhoan", adminController.storedTaiKhoan);
router.get("/stored/truyen", adminController.storedTruyen);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
