var express = require("express");
var router = express.Router();
// var bookslist = require("../resources/books");
var Books = require("../models/book");
/* GET book page. */
router.get("/books", function (req, res, next) {
  res.render("index", { title: "Books", subtitle: "Fellowship" });
});

router.get("/add", function (req, res) {
  res.render("addBooks", { title: "Add books" });
});

router.post("/save", function (req, res, next) {
  const book = new Books(req.body);
  book.save();
  console.log(book);
  res.redirect("/");
});
// router.post("/save", function (req, res, next) {
//   bookslist.push({ ...req.body, _id: `00${bookslist.length + 1}` });
//   res.redirect("/");
// });

router.get("/edit/:_id", async function (req, res, next) {
  const book = await Books.findOne({ _id: req.params._id });
  console.log(book);
  // const book = bookslist.find((book) => book._id === req.params._id);

  res.render("editBooks", { title: "Edit book", book: book });
});

router.post("/saveEdited/:_id", async function (req, res, next) {
  // const currentIndex = bookslist.findIndex(
  //   (book) => book._id === req.params._id
  // );
  // bookslist.splice(currentIndex, 1, {
  //   ...req.body,
  //   _id: req.params._id,
  // });
  await Books.updateOne({ _id: req.params._id }, { $set: req.body });

  res.redirect("/");
});

router.get("/delete/:_id", async function (req, res, next) {
  // const currentIndex = bookslist.findIndex(
  //   (book) => book._id === req.params._id
  // );
  await Books.deleteOne({ _id: req.params._id });
  // bookslist.splice(currentIndex, 1);
  res.redirect("/");
});

module.exports = router;
