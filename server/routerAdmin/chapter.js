const express = require("express");
const chapterAdminController = require("../controllerAdmin/ChapterAdminController");
const router = express.Router();

router.get("/stored/:id", chapterAdminController.storedChapter);
router.get("/create/:id", chapterAdminController.create);
router.post("/store", chapterAdminController.store);
router.get("/:id/edit", chapterAdminController.edit);
router.put("/:id", chapterAdminController.update);
router.put("/trangthai/:id", chapterAdminController.changeStatus);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
