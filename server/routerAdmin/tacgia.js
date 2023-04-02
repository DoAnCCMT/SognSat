const express = require("express");
const tacgiaAdminController = require("../controllerAdmin/TacGiaAdminController");
const router = express.Router();

router.get("/create", tacgiaAdminController.create);
router.post("/store", tacgiaAdminController.store);
router.get("/:id/edit", tacgiaAdminController.edit);
router.put("/:id", tacgiaAdminController.update);
router.put("/trangthai/:id", tacgiaAdminController.changeStatus);

//show thong tin 1 object
// router.use("/:id", loginController.show);
module.exports = router;
