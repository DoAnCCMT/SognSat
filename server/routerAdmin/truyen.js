const express = require("express");
const truyenAdminController = require("../controllerAdmin/TruyenAdminController");
const router = express.Router();

router.get("/create", truyenAdminController.create);
router.post("/store", truyenAdminController.store);
router.get("/:id/edit", truyenAdminController.edit);
router.put("/:id", truyenAdminController.update);
router.put("/trangthai/:id", truyenAdminController.changeStatus);
router.put("/tinhtrang/:id", truyenAdminController.changeTinhTrang);

module.exports = router;
