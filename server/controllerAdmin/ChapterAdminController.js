const { TaiKhoan, Truyen, TacGia, Chapter } = require("../model/model");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class ChapterAdminController {
  //[Get] chapterAdmin/stored/:id
  storedChapter = async(req, res, next) => {
    
    const truyen = await Truyen.findById(req.params.id);
    var tenTruyen = truyen.TenTruyen;
    var truyenID = req.params.id
    Chapter.find({ Truyen: req.params.id })
      .then((chapter) =>
        res.render("chapterAdmin/stored-chapter", {
          truyen: mutipleMongooseToObject(chapter),
          truyenID,tenTruyen,
        })
      )
      .catch(next);
  }

  //[GET] chapterAdmin/create/:id
  create(req, res, next) {
    var truyenID = req.params.id;
    res.render("chapterAdmin/create", { truyenID });
  }

  //[POST] /chapterAdmin/create
  store = async (req, res) => {
    try {
      const newChapter = new Chapter(req.body);
      var linkAnhs = newChapter.LinkAnhs[0].split(",");
      newChapter.LinkAnhs = linkAnhs;
      const saveChapter = await newChapter.save();
      if (req.body.Truyen) {
        const truyen = Truyen.findById(req.body.Truyen);
        await truyen.updateMany({
          $push: { Chapters: saveChapter._id },
          $set: { NgayCapNhat: saveChapter.NgayNhap },
        }); // thêm id chapter vào truyện
      }

      res.redirect("/chapterAdmin/stored/" + newChapter.Truyen);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  //[GET] /chapterAdmin/:id/edit
  edit(req, res, next) {
    Chapter.findById(req.params.id)
      .then((chapter) => {
        res.render("chapterAdmin/edit", {
          chapter: mongooseToObject(chapter),
        });
      })
      .catch(next);
  }
  //[PUT] /chapterAdmin/:id
  update(req, res, next) {
    const chapter = new Chapter(req.body);

    var linkAnhs = chapter.LinkAnhs[0].split(",");
    console.log(req.body);
    req.body.LinkAnhs = linkAnhs;

    Chapter.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/chapterAdmin/stored/" + chapter.Truyen))
      .catch((error) => {res.status(500).send("Tên Chapter đã tồn tại")});
  }

  //[PUT] /chapterAdmin/trangthai/:id
  changeStatus = async (req, res, next) => {
    const chapter = await Chapter.findById(req.params.id);
    chapter
      .updateOne({ $set: { TrangThai: !chapter.TrangThai } })
      .then(() => res.redirect("back"))
      .catch(next);
  };
}

module.exports = new ChapterAdminController();
