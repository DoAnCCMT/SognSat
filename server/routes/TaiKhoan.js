const TaiKhoanController = require("../controller/TaiKhoanController");
const router = require("express").Router();
//Thêm tài khoản
router.post("/", TaiKhoanController.AddTaiKhoan);
//Lấy thông tin 1 tài khoản
router.get("/:id", TaiKhoanController.Get1TaiKhoan);
//Cập nhật thông tin tài khoản
router.put("/:id", TaiKhoanController.Update1TaiKhoan);
//Cập nhật thông tin mật khẩu
router.put("/UpdateMatKhau/:id", TaiKhoanController.UpdateMatKhau);
//đăng nhập
router.post("/login", TaiKhoanController.loginUser);
//Lấy toàn bộ thông tin tài khoản
router.get("/", TaiKhoanController.GetAllTaiKhoan);
//xuất router
module.exports = router;
