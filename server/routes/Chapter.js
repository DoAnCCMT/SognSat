const ChapterController = require("../controller/ChapterController");
const router = require("express").Router();
//thêm chapter
router.post("/", ChapterController.AddChapter);
// //Lấy toàn bộ thông tin chapter
// router.get("/", ChapterController.GetAllChapter);
//Lấy thông tin 1 chapter
router.get("/:id", ChapterController.Get1Chapter);
//Cập nhật chapter
router.put("/:id", ChapterController.Update1Chapter);
//xuất router
module.exports = router;
