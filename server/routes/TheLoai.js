const TheLoaiController = require("../controller/TheLoaiController");
const router = require("express").Router();

//Thêm Thể Loại
router.post("/", TheLoaiController.AddTheLoai);
// //Lấy toàn bộ thông tin tác giả
router.get("/", TheLoaiController.GetAllTheLoai);
// //Lấy thông tin 1 tác giả
router.get("/:id", TheLoaiController.Get1TheLoai);
// //Cập nhật thông tin tác giả
router.put("/:id", TheLoaiController.Update1TheLoai);
//xuất router
module.exports = router;