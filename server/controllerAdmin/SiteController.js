const { TaiKhoan, Truyen, TacGia, TheLoai } = require("../model/model");
const { mutipleMongooseToObject } = require("../util/mongoose");

class SiteController {
  //[Get] /home (hien thi truyen)
  // home(req, res, next) {
  //   Truyen.find({})
  //     .then((truyens) => {
  //       res.render("home", {
  //         truyens: mutipleMongooseToObject(truyens),
  //       });
  //     })
  //     .catch(next);
  // }

   //[Get] /home (thong ke)
  home = async(req, res, next) => {
    const truyen =  (await Truyen.find({})).length;
    const tacgia =  (await TacGia.find({})).length;
    const theloai =  (await TheLoai.find({})).length;
    const taikhoan =  (await TaiKhoan.find({})).length;
    
    res.render("home", {
      truyen,tacgia,theloai,taikhoan
    });
  }

}

module.exports = new SiteController();
