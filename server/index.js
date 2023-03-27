const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");

//Sử dụng để tạo file .env - sử dụng để tạo file chứa các thông tin cần bảo mật
dotenv.config();
//bodyParser phân tích dữ liệu và đưa vào document => lấy data form từ req.body
//giới hạn 50mb
app.use(bodyParser.json({ limit: "50mb" }));
//CORS là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// khi send request sẽ thông báo dưới terminal
app.use(morgan("common"));

//Connect Database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conected to Database !!!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/api", (req, res) => {
  res.status(200).send("test server");
});
//kiểm tra port hoạt động ở 8000
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running at 8000");
});

//Xác thực
//Phân quyền
