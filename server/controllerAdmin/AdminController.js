const { TaiKhoan, Truyen, TacGia, TheLoai } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class AdminController {
  //[Get] Admin/stored/tacgia
  storedTacGia(req, res, next) {
    TacGia.find({})
      .then((tacgia) =>
        res.render("admin/stored-TacGia", {
          tacgia: mutipleMongooseToObject(tacgia),
        })
      )
      .catch(next);
  }

  //[Get] Admin/stored/theloai
  storedTheLoai(req, res, next) {
    TheLoai.find({})
      .then((theloai) =>
        res.render("admin/stored-TheLoai", {
          theloai: mutipleMongooseToObject(theloai),
        })
      )
      .catch(next);
  }

  //[Get] Admin/stored/theloai
  storedTaiKhoan(req, res, next) {
    TaiKhoan.find({})
      .then((taikhoan) =>
        res.render("admin/stored-TaiKhoan", {
          taikhoan: mutipleMongooseToObject(taikhoan),
        })
      )
      .catch(next);
  }

  storedTruyen = async (req, res, next) => {
    const truyen = await Truyen.find({});
    for (let i = 0; i < truyen.length; i++) {
      var listTheLoai = []
      var listTacGia = []
      for (let j = 0; j < truyen[i].TheLoais.length; j++) {
        var theLoai = await TheLoai.findById(truyen[i].TheLoais[j])
        listTheLoai[j] = theLoai.TenTheLoai;
      }
      for (let e = 0; e < truyen[i].TacGias.length; e++) {
        var tacgia = await TacGia.findById(truyen[i].TacGias[e])
        listTacGia[e] = tacgia.TenTacGia;
      }
      truyen[i].TheLoais = listTheLoai;
      truyen[i].TacGias = listTacGia;
      
    }
    res.render("admin/stored-Truyen", {
      truyen: mutipleMongooseToObject(truyen),
    })
  }
}

module.exports = new AdminController();
