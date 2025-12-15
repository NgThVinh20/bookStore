const {buildCategoryTree} = require("../../helpers/category.helper")
const AccountAdmin = require("../../models/accountAdmin.model")
const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
const moment = require("moment");
const slugify = require('slugify');


module.exports.list = async (req, res) => {
  const find = {
    deleted: false
  };
  // lọc theo trạng thái 
  if(req.query.status) {
    find.status = req.query.status;
  }
  // lọc theo người tạo
   if(req.query.createdBy) {
    find.createdBy = req.query.createdBy;
  }
  // lọc theo ngày tạo
  const filterDate = {}
    if(req.query.startDate){
      filterDate.$gte = moment(req.query.startDate).toDate()
      find.createdAt = filterDate;
    }
    if(req.query.endDate){
      filterDate.$lte = moment(req.query.endDate).toDate()
      find.createdAt =filterDate;
    }
  // lọc theo ô input
  if(req.query.keyword){
      let regex = req.query.keyword.trim();
      regex = regex.replace(/\s+/g, " ")
      regex =slugify(regex)
      regex = new RegExp(regex, "i");
      find.slug=regex;  
    }
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
  // Danh sách tài khoản quản trị
  const accountAdminList = await AccountAdmin
    .find({})
    .select("id fullname");

  res.render('admin/pages/book-list', {
    pageTitle: "Quản lý Sách",
    bookList: bookList,
    accountAdminList: accountAdminList
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


module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const bookDetail = await Book.findOne({
    _id: id,
    deleted: false
  })
  if(!bookDetail) {
    res.redirect(`/${pathAdmin}/books/list`);
    return;
  }
  bookDetail.timeFormat = bookDetail.time ? moment(bookDetail.time).format("YYYY-MM-DD") : "";
  const categoryList = await Category.find(({
    deleted:false
  }))
  const categoryTree = buildCategoryTree(categoryList);
  res.render('admin/pages/product-edit.pug', {
    pageTitle:"Trang Quản chỉnh sửa danh mục",
    categoryList:categoryTree,
    bookDetail:bookDetail
  });
} 
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
  
    const bookDetail = await Book.findOne({
      _id: id,
      deleted: false
    })

    if(!bookDetail) {
      res.json({
        code: "error",
        message: "Sản phẩm không tồn tại!"
      })
      return;
    }
    
    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      req.body.avatar = "";
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

    req.body.updatedBy = req.account.id;

    await Book.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
      message: "Đã cập nhật sản phẩm!"
    })
  } 
  catch (error) {
    res.json({
      code: "error",
      message: "Sản phẩm không tồn tại!"
    })
  }
}
module.exports.trash = (req, res) => {
  res.render('admin/pages/trash-product.pug', {
    pageTitle:"Trang thùng rác"
  });
} 


module.exports.changeMultiPatch = async (req, res) => {
  try {
    const {listId, option} = req.body;
    switch(option){
      case "active":
      case "inactive":
        await Book.updateMany(
          {
          _id: {$in: listId},
          deleted:false 
          },{
            status:option,
            updatedBy : req.account.id
          }
        )
        res.json({
          code: "success",
          message: "Đã cập nhật trạng thái!"
        })
        break;
      case "delete":
        await Book.updateMany(
          {
          _id: {$in: listId},
          deleted:false 
          },{
            deleted:true,
            deletedBy: req.account.id,
            deletedAt: Date.now()
          }
        )
        res.json({
          code: "success",
          message: "Đã các bản ghi!"
        })
        break;
      default:
        res.json({
          code: "error",
          message: "Dữ liệu không hợp lệ!"
        })
        break;
    }
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}