const {buildCategoryTree} = require("../../helpers/category.helper")
const AccountAdmin = require("../../models/accountAdmin.model")
const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
const moment = require("moment");

module.exports.list = async (req, res) => {
  const find = {
    deleted: false
  };

  const bookList = await Book
    .find(find)
    .sort({
      position: "desc"
    });

   for(const item of bookList){
    if(item.createdBy){
      const infoAccount = await AccountAdmin.findOne({
        _id: item.createdBy
      })
      if(infoAccount){
        item.createdByFullname = infoAccount.fullname;
        item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
      }
    }
     if(item.updatedBy){
      const infoAccount = await AccountAdmin.findOne({
        _id: item.updatedBy
      })
      if(infoAccount){
        item.updatedByFullname = infoAccount.fullname;
        item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY")
      }
    }
  }
  res.render('admin/pages/book-list', {
    pageTitle: "Quản lý Sách",
    bookList: bookList,
  });
}




module.exports.create = async (req, res) => {
 const categoryList = await Category
    .find({
      deleted: false
    })

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
