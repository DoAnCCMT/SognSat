const { TaiKhoan, Truyen, TacGia, TheLoai } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class TheLoaiAdminController {
  //[GET] /theloaiadmin/create
  create(req, res, next) {
    res.render("theloaiAdmin/create");
  }

  //[POST] /theloaiadmin/create
  store(req, res, next) {
    const theLoai = new TheLoai(req.body);
    theLoai
      .save()
      .then(() => res.redirect("/admin/stored/theloai"))
      .catch((error) => {res.status(500).send("Thể loại đã tồn tại")});
  }

  //[GET] /tatheloaiadmincgia/:id/edit
  edit(req, res, next) {
    TheLoai.findById(req.params.id)
      .then((theloai) => {
        res.render("theloaiAdmin/edit", {
          theloai: mongooseToObject(theloai),
        });
      })
      .catch(next);
  }
  //[PUT] /theloaiadmin/:id
  update(req, res, next) {
    TheLoai.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/stored/theloai"))
      .catch((error) => {res.status(500).send("Thể loại đã tồn tại")});
  }

  //[PUT] /theloaiadmin/trangthai/:id
  changeStatus = async (req, res, next) => {
    const theloai = await TheLoai.findById(req.params.id);
    theloai
      .updateOne({ $set: { TrangThai: !theloai.TrangThai } })
      .then(() => res.redirect("back"))
      .catch(next);
  };
}

module.exports = new TheLoaiAdminController();
