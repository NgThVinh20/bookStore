const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
const moment = require("moment");
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
  for(const item of bookDetail){
    if(item.parent){
      const category = await Category.findOne({
        _id: item.parent
      })
      item.parentName = category.name;
    }
    if(item.time){
        item.timeFormat = moment(item.time).format("DD/MM/YYYY")
    }
    item.priceDiscount = Math.round(((item.priceOld - item.priceNew) / item.priceOld) * 100);
  }
  const authorList = await Book.distinct("author", {
    deleted: false,
    status: "active"
  });
  for(const item of authorList){
    console.log(item.id);
  }
  res.render('client/pages/danh-sach-sach.pug', {
    pageTitle:categoryDetail.name,
    breadcumb:breadcumb,
    categoryDetail:categoryDetail,
    totalRecords:totalRecords,
    bookDetail:bookDetail,
    authorList:authorList
  });
}