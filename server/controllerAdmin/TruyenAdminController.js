const { TaiKhoan, Truyen, TacGia, TheLoai } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class TruyenAdminController {
  //[GET] /truyen/create
  create = async (req, res, next) => {
    // res.render("truyenAdmin/create");
    const tacgia = await TacGia.find({});
    const theloai = await TheLoai.find({});
    const tenTacGia = [];
    const tenTheLoai = [];
    for (let i = 0; i < tacgia.length; i++) {
      tenTacGia.push(tacgia[i].TenTacGia);
    }
    for (let i = 0; i < theloai.length; i++) {
      tenTheLoai.push(theloai[i].TenTheLoai);
    }
    res.render("truyenAdmin/create", { tenTacGia, tenTheLoai });
  };

  //[POST] /truyen/create
  store = async(req, res, next) => {
    const truyen = new Truyen(req.body);
    var tenTacGias = truyen.TacGias[0].split(",");
    var tenTheLoais = truyen.TheLoais[0].split(",");
    tenTacGias.splice(tenTacGias.length -1,1);
    tenTheLoais.splice(tenTheLoais.length -1,1);
    const theloaiIDs = [];
    const tacGiaIDs = [];

    for (let i = 0; i < tenTheLoais.length; i++) {
      var theLoai = await TheLoai.findOne({TenTheLoai: tenTheLoais[i]})
      theloaiIDs.push(theLoai.id);
    }
    for (let i = 0; i < tenTacGias.length; i++) {
      var tacGia = await TacGia.findOne({TenTacGia: tenTacGias[i]})
      tacGiaIDs.push(tacGia.id);
    }
    truyen.TacGias = tacGiaIDs;
    truyen.TheLoais = theloaiIDs;
    truyen.save();
    res.redirect("/admin/stored/truyen");
  }
  //[GET] /truyen/:id/edit
  edit = async(req, res, next) => {

    const truyen =  await Truyen.findById(req.params.id)
    const tacgia = await TacGia.find({});
    const theloai = await TheLoai.find({});
    const tenTacGia = [];
    const tenTheLoai = [];
    const tentheloaiCuaTruyen = [];
    const tentacgiaCuaTruyen = [];

    for (let i = 0; i < tacgia.length; i++) {
      tenTacGia.push(tacgia[i].TenTacGia);
      for (let j = 0; j < truyen.TacGias.length; j++) {
        if (tacgia[i].id == truyen.TacGias[j]) {
          tentacgiaCuaTruyen.push(tacgia[i].TenTacGia);
        }
      }
    }
    tentacgiaCuaTruyen.push("");
    for (let i = 0; i < theloai.length; i++) {
      tenTheLoai.push(theloai[i].TenTheLoai);
      for (let j = 0; j < truyen.TheLoais.length; j++) {
        if (theloai[i].id == truyen.TheLoais[j]) {
          tentheloaiCuaTruyen.push(theloai[i].TenTheLoai);
        }
      }
    }
    tentheloaiCuaTruyen.push("");
    truyen.TheLoais = tentheloaiCuaTruyen;
    truyen.TacGias = tentacgiaCuaTruyen;
  
        res.render("truyenAdmin/edit", {
          truyen: mongooseToObject(truyen),tenTacGia, tenTheLoai
        });
  }
  //[PUT] /truyen/:id
  update = async(req, res, next) => {
    const truyen = new Truyen(req.body);
    var tenTacGias = truyen.TacGias[0].split(",");
    var tenTheLoais = truyen.TheLoais[0].split(",");
    tenTacGias.splice(tenTacGias.length -1,1);
    tenTheLoais.splice(tenTheLoais.length -1,1);
    const theloaiIDs = [];
    const tacGiaIDs = [];
    for (let i = 0; i < tenTheLoais.length; i++) {
      var theLoai = await TheLoai.findOne({TenTheLoai: tenTheLoais[i]})
      theloaiIDs.push(theLoai.id);
    }
    for (let i = 0; i < tenTacGias.length; i++) {
      var tacGia = await TacGia.findOne({TenTacGia: tenTacGias[i]})
      tacGiaIDs.push(tacGia.id);
    }

    req.body.TacGias = tacGiaIDs;
    req.body.TheLoais = theloaiIDs;

    Truyen.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/admin/stored/truyen"))
      .catch(next);
  }

  //[PUT] /truyen/trangthai/:id
  changeStatus = async (req, res, next) => {
    const truyen = await Truyen.findById(req.params.id);
    truyen
      .updateOne({ $set: { TrangThai: !truyen.TrangThai } })
      .then(() => res.redirect("back"))
      .catch(next);
  };

  //[PUT] /truyen/tinhtrang/:id
  changeTinhTrang = async (req, res, next) => {
    const truyen = await Truyen.findById(req.params.id);
    truyen
      .updateOne({ $set: { TinhTrang: !truyen.TinhTrang } })
      .then(() => res.redirect("back"))
      .catch(next);
  };
}

module.exports = new TruyenAdminController();
