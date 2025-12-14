const {buildCategoryTree} = require("../../helpers/category.helper")
const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
module.exports.list = async (req, res) => {
  res.render('admin/pages/book-list.pug', {
    pageTitle:"Trang Quản lý sách"
  });
} 


module.exports.create = async (req, res) => {
  const categoryList = await Category.find(({
    deleted:false
  }))

  const categoryTree = buildCategoryTree(categoryList);

  res.render('admin/pages/product-create.pug', {
    pageTitle:"Trang tạo sản phẩm",
    categoryList:categoryTree
  });
} 

module.exports.createPost = async (req, res) => {
  // console.log(req.file);
  if(req.file){
    req.body.avatar=req.file.path;
  }else{
    req.body.avatar="";
  }

  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const record = await Book
      .findOne({})
      .sort({
        position: "desc"
      })
    if(record) {
      req.body.position = record.position + 1;
    } else {
      req.body.position = 1;
    }
  }

  req.body.createdBy = req.account.id;
  req.body.priceNew = req.body.priceNew ? parseInt(req.body.priceNew) : req.body.priceOld;
  req.body.priceOld = req.body.priceOld ? parseInt(req.body.priceOld) : 0;
  req.body.amount = req.body.amount ? parseInt(req.body.amount) : 0;
  req.body.time = req.body.time? new Date(req.body.time) : null;
  const newRecord = new  Book(req.body);
  await newRecord.save();

  // console.log(req.body);
  res.json({
    code: "success",
    message: "Đã tạo sản phẩm!"
  });
}


module.exports.trash = (req, res) => {
  res.render('admin/pages/trash-product.pug', {
    pageTitle:"Trang thùng rác"
  });
} 
