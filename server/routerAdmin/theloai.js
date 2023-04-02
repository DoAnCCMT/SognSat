const express = require("express");
const theloaiAdminController = require("../controllerAdmin/TheLoaiAdminController");
const router = express.Router();

router.get("/create", theloaiAdminController.create);
router.post("/store", theloaiAdminController.store);
router.get("/:id/edit", theloaiAdminController.edit);
router.put("/:id", theloaiAdminController.update);
router.put("/trangthai/:id", theloaiAdminController.changeStatus);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
