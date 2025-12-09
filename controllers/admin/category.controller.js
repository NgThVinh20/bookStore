const {buildCategoryTree} = require("../../helpers/category.helper")
const Category = require("../../models/category.model")
const AccountAdmin = require("../../models/accountAdmin.model")
const moment = require("moment");

module.exports.list = async(req, res) => {
  const categoryList = await Category.find({
    deleted: false
  }).sort({
    positon: "desc"
  })
  for(const item of categoryList){
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
  res.render('admin/pages/category.list.pug', {
    pageTitle:"Trang Quản lý danh mục",
    categoryList: categoryList
  });
} 

module.exports.create = async (req, res) => {
  const categoryList = await Category.find(({
    deleted:false
  }))

  const categoryTree = buildCategoryTree(categoryList);
  res.render('admin/pages/category-create.pug', {
    pageTitle:"Trang Quản tạo danh mục",
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
    const record = await Category
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
  const newRecord = new  Category(req.body);
  await newRecord.save();

  // console.log(req.body);
  res.json({
    code: "success",
    message: "Đã tạo danh mục!"
  });
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const categoryDetail = await Category.findOne({
    _id: id,
    deleted: false
  })
  if(!categoryDetail) {
    res.redirect(`/${pathAdmin}/category/list`);
    return;
  }

  const categoryList = await Category.find(({
    deleted:false
  }))
  const categoryTree = buildCategoryTree(categoryList);
  res.render('admin/pages/category-edit.pug', {
    pageTitle:"Trang Quản chỉnh sửa danh mục",
    categoryList:categoryTree,
    categoryDetail:categoryDetail
  });
} 
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
  
    const categoryDetail = await Category.findOne({
      _id: id,
      deleted: false
    })

    if(!categoryDetail) {
      res.json({
        code: "error",
        message: "Danh mục không tồn tại!"
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
      const record = await Category
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

    await Category.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
      message: "Đã cập nhật danh mục!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Danh mục không tồn tại!"
    })
  }
}
