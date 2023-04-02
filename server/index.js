const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
var bodyParser = require("body-parser");
const morgan = require("morgan");

const tacgiaRoute = require("./routes/TacGia");
const truyenRoute = require("./routes/Truyen");
const taikhoanRoute = require("./routes/TaiKhoan");
const chapterRoute = require("./routes/Chapter");
const binhluanRoute = require("./routes/BinhLuan");
const theloaiRoute = require("./routes/TheLoai");

const route = require("./routerAdmin");
const { options } = require("./routes/TacGia");

//Sử dụng để tạo file .env - sử dụng để tạo file chứa các thông tin cần bảo mật
dotenv.config();
//bodyParser phân tích dữ liệu và đưa vào document => lấy data form từ req.body
//giới hạn 50mb
app.use(bodyParser.json({ limit: "50mb" }));
//CORS là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(methodOverride("_method"));
// khi send request sẽ thông báo dưới terminal
app.use(morgan("common"));

app.use(express.static(path.join(__dirname, "public")));

//Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//test khi server host web thành công
// app.get("/", (req, res) => {
//   res.status(200).json("mo server thanh cong");
// });
//Connect Database
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB successful");
});
~(
  // route admin init
  route(app)
);
//Routes
app.use("/TacGia", tacgiaRoute);
app.use("/TheLoai", theloaiRoute);
app.use("/Truyen", truyenRoute);
app.use("/TaiKhoan", taikhoanRoute);
app.use("/Chapter", chapterRoute);
app.use("/BinhLuan", binhluanRoute);

//kiểm tra port hoạt động ở 8000
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running at 8000");
});
