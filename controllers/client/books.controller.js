const Book = require("../../models/book.model");
const Category = require("../../models/category.model");
const moment = require("moment");
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const bookDetail = await Book.findOne({
    slug:slug,
    deleted:false,
    status:"active"
  })
  if(!bookDetail){
    res.redirect("/");
    return;
  }
   const categoryDetail = await Category.findOne({
    _id:bookDetail.parent,
    deleted:false,
    status:"active"
  })
  if(bookDetail.parent){
    const category = await Category.findOne({
      _id: bookDetail.parent
    })
    bookDetail.parentName = category.name;
  }
  if(bookDetail.time){
      bookDetail.timeFormat = moment(bookDetail.time).format("DD/MM/YYYY")
  }
 
  res.render('client/pages/chi-tiet-sach.pug', {
    bookDetail:bookDetail,
    pageTitle:bookDetail.name,
    categoryDetail:categoryDetail
  });
}

