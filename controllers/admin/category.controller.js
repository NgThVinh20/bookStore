const {buildCategoryTree} = require("../../helpers/category.helper")
const Category = require("../../models/category.model")
const AccountAdmin = require("../../models/accountAdmin.model")
const Book = require("../../models/book.model")
const moment = require("moment");
const slugify = require('slugify')



module.exports.list = async(req, res) => {
  const find = {
    deleted: false,
  };
  // lọc theo trạng thái 
  if(req.query.status){
    find.status=req.query.status;
  }
  // lọc theo người tạo
  if(req.query.createdBy){
    find.createdBy=req.query.createdBy;
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
    console.log(regex);
    find.slug=regex;  
  }

  // phân trang 
  const limitItem = 3;
  let page=1;
  if(req.query.page){
    page=parseInt(req.query.page);
  }
  const skip = (page-1)*limitItem
  const totalRecord = await Category.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItem);
  const pagination = {
    totalPage:totalPage,
    skip: skip,
    totalRecord:totalRecord
  }
  const categoryList = await Category.find(find).sort({
    position: "desc"
  }).limit(limitItem).skip(skip);
  // phân trang 


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

  // danh sách tài khoản quản trị
  const accountAdminList = await AccountAdmin.find({}).select("id fullname")
  res.render('admin/pages/category.list.pug', {
    pageTitle:"Trang Quản lý danh mục",
    categoryList: categoryList,
    accountAdminList: accountAdminList,
    pagination: pagination
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
    pageTitle:"Trang chỉnh sửa danh mục",
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
  } 
  catch (error) {
    res.json({
      code: "error",
      message: "Danh mục không tồn tại!"
    })
  }
}
module.exports.deletePatch = async (req, res) => {
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

    // kiểm tra danh mục có sách 
    const booksCount = await Book.countDocuments({
      parent: id,
      deleted: false
    });

    // Kiểm tra danh mục có danh mục con
    const subcategoriesCount = await Category.countDocuments({
      parent: id,
      deleted: false
    });

    if (booksCount > 0 || subcategoriesCount > 0) {
      res.json({
        code: "error",
        message: "Không thể xóa danh mục vì có sách hoặc danh mục con!"
      });
      return;
    }

    await Category.updateOne({
      _id: id,
      deleted: false
    },
    {
      deleted: true,
      deletedBy: req.account.id,
      deletedAt: Date.now()
    });
    res.json({
      code: "success",
      message: "Đã xóa danh mục!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Danh mục không tồn tại!"
    })
  }
}

module.exports.changeMultiPatch = async (req, res) => {
  try {
    const {listId, option} = req.body;
    switch(option){
      case "active":
      case "inactive":
        await Category.updateMany(
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
        // Kiểm tra từng danh mục có sách hoặc danh mục con
        for (const id of listId) {
          const booksCount = await Book.countDocuments({
            parent: id,
            deleted: false
          });
          const subcategoriesCount = await Category.countDocuments({
            parent: id,
            deleted: false
          });
          if (booksCount > 0 || subcategoriesCount > 0) {
            res.json({
              code: "error",
              message: `Không thể xóa danh mục có ID ${id} vì có sách hoặc danh mục con!`
            });
            return;
          }
        }
        await Category.updateMany({
          _id: { $in: listId },
          deleted: false
        }, {
          deleted: true,
          deletedBy: req.account.id,
          deletedAt: Date.now()
        });
        res.json({
          code: "success",
          message: "Đã xóa các bản ghi!"
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


module.exports.trash = async (req, res) => {
  const find = {
    deleted: true
  };
  // lọc theo ô input
  if(req.query.keyword){
      let regex = req.query.keyword.trim();
      regex = regex.replace(/\s+/g, " ")
      regex =slugify(regex)
      regex = new RegExp(regex, "i");
      find.slug=regex;  
  }
  // Phân trang
  const limitItem = 3;
  let page=1;
  if(req.query.page){
    page=parseInt(req.query.page);
  }
  const skip = (page-1)*limitItem
  const totalRecord = await Book.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItem);
  const pagination = {
    totalPage:totalPage,
    skip: skip,
    totalRecord:totalRecord
  }

  const categoryList = await Category
    .find(find)
    .sort({ deletedAt: "desc" })
    .limit(limitItem)
    .skip(skip);

  for(const item of categoryList){
    if(item.createdBy){
      const infoAccount = await AccountAdmin.findOne({ _id: item.createdBy })
      if(infoAccount){
        item.createdByFullname = infoAccount.fullname;
        item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
      }
    }
    if(item.deletedBy){
      const infoAccount = await AccountAdmin.findOne({ _id: item.deletedBy })
      if(infoAccount){
        item.deletedByFullname = infoAccount.fullname;
        item.deletedAtFormat = moment(item.deletedAt).format("HH:mm - DD/MM/YYYY")
      }
    }
  }

  res.render('admin/pages/trash-category.pug', {
    pageTitle:"Trang thùng rác",
    categoryList: categoryList,
    pagination: pagination,
  });
}
module.exports.undoPatch = async (req, res) => {
  try {
    const id = req.params.id;
  
    const categoryDetail = await Category.findOne({
      _id: id,
      deleted: true
    })

    if(!categoryDetail) {
      res.json({
        code: "error",
        message: "Danh mục không tồn tại!"
      })
      return;
    }

    await Category.updateOne({
      _id: id,
      deleted: true
    }, {
      deleted: false,
    });
    res.json({
      code: "success",
      message: "Đã khôi phục sản phẩm!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Sản phẩm không tồn tại!"
    })
  }
}
module.exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
  
    const categoryDetail = await Category.findOne({
      _id: id,
      deleted: true
    })

    if(!categoryDetail) {
      res.json({
        code: "error",
        message: "Danh mục không tồn tại!"
      })
      return;
    }

    await Category.deleteOne({
      _id: id,
      deleted: true
    });
    res.json({
      code: "success",
      message: "Đã xóa danh mục!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Danh mục không tồn tại!"
    })
  }
}
// Multi remove/undo 
module.exports.trashMultiPatch = async (req, res) => {
  const { listId, option } = req.body;
  if (!Array.isArray(listId) || !option) {
    return res.json({ code: 'error', message: 'Dữ liệu không hợp lệ!' });
  }
  try {
    if (option == 'remove') {
      await Category.deleteMany({ _id: { $in: listId }, deleted: true });
      return res.json({ code: 'success', message: 'Đã xóa vĩnh viễn các bản ghi!' });
    }
    if (option == 'undo') {
      await Category.updateMany({ _id: { $in: listId }, deleted: true }, { deleted: false });
      return res.json({ code: 'success', message: 'Đã khôi phục các bản ghi!' });
    }
    return res.json({ code: 'error', message: 'Dữ liệu không hợp lệ!' });
  } catch (e) {
    return res.json({ code: 'error', message: 'Có lỗi xảy ra!' });
  }
};