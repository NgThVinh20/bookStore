const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
module.exports.list = async (req, res) => {
  const slug = req.params.slug;
  const categoryDetail = await Category.findOne({
    slug:slug,
    deleted:false,
    status:"active"
  })
  const totalRecords = await Book.countDocuments({ parent: categoryDetail._id });
  if(!categoryDetail){
    res.redirect("/");
    return;
  }
  // breadcumb
  const breadcumb = []
  breadcumb.push({
    name:categoryDetail.name,
    slug:categoryDetail.slug
  })
  const bookDetail = await Book.find({
    parent: categoryDetail._id,
    deleted: false,
    status: "active"
  }).sort({
    createdAt: "desc"
  })
  res.render('client/pages/danh-sach-sach.pug', {
    pageTitle:categoryDetail.name,
    breadcumb:breadcumb,
    categoryDetail:categoryDetail,
    totalRecords:totalRecords,
    bookDetail:bookDetail
  });
}