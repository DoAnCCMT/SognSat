const { TaiKhoan, Truyen, TacGia } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class TaiKhoanAdminController {
  //[PUT] /tacgia/trangthai/:id
  changeStatus = async (req, res, next) => {
    const taikhoan = await TaiKhoan.findById(req.params.id);
    taikhoan
      .updateOne({ $set: { TrangThai: !taikhoan.TrangThai } })
      .then(() => res.redirect("back"))
      .catch(next);
  };
}

module.exports = new TaiKhoanAdminController();
