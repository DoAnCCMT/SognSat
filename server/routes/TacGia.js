const TacGiaController = require("../controller/TacGiaController");
const router = require("express").Router();

//Thêm tác giả
router.post("/", TacGiaController.AddTacGia);
//Lấy toàn bộ thông tin tác giả
router.get("/", TacGiaController.GetAllTacGia);
//Lấy thông tin 1 tác giả
router.get("/:id", TacGiaController.Get1TacGia);
//Cập nhật thông tin tác giả
router.put("/:id", TacGiaController.Update1TacGia);
//xuất router
module.exports = router;
