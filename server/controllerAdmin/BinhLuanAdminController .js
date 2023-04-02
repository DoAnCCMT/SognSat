const { TaiKhoan, Truyen, TacGia, Chapter, BinhLuan } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class BinhLuanAdminController {
  //[Get] binhluanAdmin/stored/:id
  storedBinhLuan = async (req, res, next) => {
    const binhluan = await BinhLuan.find({Chapter: req.params.id}).populate("TaiKhoan");
    res.render("binhluanAdmin/stored-binhluan", {
      truyen: mutipleMongooseToObject(binhluan),
    })
  }
  //[PUT] /binhluanAdmin/trangthai/:id
  changeStatus = async (req, res, next) => {
    const binhluan = await BinhLuan.findById(req.params.id);
    binhluan
      .updateOne({ $set: { TrangThai: !binhluan.TrangThai } })
      .then(() => res.redirect("back"))
      .catch(next);
  };

}

module.exports = new BinhLuanAdminController();
