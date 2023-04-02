const loginRouter = require("./login");
const siteRouter = require("./site");
const tacgiaRouter = require("./tacgia");
const theloaiRouter = require("./theloai");
const taikhoanRouter = require("./taikhoan");
const truyenRouter = require("./truyen");
const adminRouter = require("./admin");
const chapterRouter = require("./chapter");
const binhluanRouter = require("./binhluan");

function route(app) {
  app.use("/loginadmin", loginRouter);
  app.use("/tacgiaAdmin", tacgiaRouter);
  app.use("/theloaiAdmin", theloaiRouter);
  app.use("/taikhoanAdmin", taikhoanRouter);
  app.use("/truyenAdmin", truyenRouter);
  app.use("/chapterAdmin", chapterRouter);
  app.use("/binhluanAdmin", binhluanRouter);
  app.use("/admin", adminRouter);
  app.use("/", siteRouter);
}

module.exports = route;
