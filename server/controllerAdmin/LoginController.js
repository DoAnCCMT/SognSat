const { TaiKhoan, Truyen } = require("../model/model");
const { mutipleMongooseToObject } = require("../util/mongoose");
const bcrypt = require("bcrypt");
class LoginController {
  //[Get] /loginadmin
  index(req, res) {
    res.render("loginadmin", { message: req.flash("message") });
  }

  login = async (req, res) => {
    const user = await TaiKhoan.findOne({ TaiKhoan: req.query.TaiKhoan });
    if (!user) {
      req.flash("message", "Sai tài khoản hoặc mật khẩu!!!");
      res.redirect("");
      console.log("Sai tài khoản hoặc mật khẩu!!!");
    } else {
      const validPassword = await bcrypt.compare(
        req.query.MatKhau,
        user.MatKhau
      );
      if (!validPassword) {
        req.flash("message", "Sai tài khoản hoặc mật khẩu!!!");
        res.redirect("");
      }
      if (user && validPassword && user.PhanQuyen) {
        res.redirect("/");
      }
    }
  };

  // show thong tin 1
  //   show(req, res) {
  //     res.send("tai khoang detail");
  //   }
}

module.exports = new LoginController();
