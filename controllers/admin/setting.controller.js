const websiteInfor = require("../../models/websiteInfor.model.js");
const {permissions} = require("../../config/variable.config.js");
const role = require("../../models/role.model.js");
const slugify = require('slugify');
const AccountAdmin = require("../../models/accountAdmin.model.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const moment = require("moment");

module.exports.list = (req, res) => {
  res.render('admin/pages/settings.pug', {
    pageTitle:"Cài đặt chung"
  });
} 


module.exports.info = async (req, res) => {
  const websiteInfo = await websiteInfor.findOne({});
  res.render('admin/pages/information-website.pug', {
    pageTitle:"Thông tin website",
    websiteInfo: websiteInfo
  });
} 
module.exports.infoPatch = async (req, res) => {
  req.body.logo = req.files && req.files['logo'] ? req.files['logo'][0].path : "";
  req.body.favicon = req.files && req.files['favicon'] ? req.files['favicon'][0].path : "";

  const existingRecord = await websiteInfor.findOne({});  
  if (!existingRecord) {
    const newRecord = new websiteInfor(req.body);
    await newRecord.save();
  }else{
    await websiteInfor.updateOne({}, req.body);
  }
  res.json({
    code:"success",
    message: "Cập nhật thông tin website thành công!"
  })
} 




module.exports.accountAdminList = async (req, res) => {
  const find = {
    deleted: false,
  };
  // lọc theo trạng thái 
  if(req.query.status){
    find.status=req.query.status;
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

  // lọc theo quyền
  if(req.query.role){
    find.role = req.query.role;
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
  const totalRecord = await AccountAdmin.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItem);
  const pagination = {
    totalPage:totalPage,
    skip: skip,
    totalRecord:totalRecord
  }
  const accountAdminList = await AccountAdmin
    .find(find)
    .sort({
      createdAt: "desc"
    }).limit(limitItem).skip(skip);

  for (const item of accountAdminList) {
    if(item.role) {
      const roles = await role.findOne({
        _id: item.role,
        deleted: false
      })
      if(roles) {
        item.roleName = roles.name;
      }
    }
  }
  for(const item of accountAdminList){
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
  const roleList = await role.find({deleted: false});
  res.render('admin/pages/account-manager', {
    pageTitle: "Tài khoản quản trị",
    accountAdminList: accountAdminList,
    pagination: pagination,
    roleList: roleList
  });
}

module.exports.adminCreate = async(req, res) => {
  const roleList = await role.find({deleted:false});
  res.render('admin/pages/create-account-manager.pug', {
    pageTitle:"Tạo tài khoản quản trị",
    roleList:roleList
  });
} 
module.exports.adminCreatePost = async(req, res) => {
  const existEmail = await AccountAdmin.findOne({email: req.body.email});
  if(existEmail){
    res.json({
      code:"error",
      message: "Email đã tồn tại!"
    })
    return;
  }
  if(req.file){
    req.body.avatar=req.file.path;
  }else{
    req.body.avatar="";
  }
  req.body.createdBy = req.account.id
  req.body.Password = await bcrypt.hash(req.body.Password, 10);
  console.log(req.body);
  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code:"success",
    message: "Tạo tài khoản thành công!"
  })
} 
module.exports.adminEdit = async(req, res) => {
  try {
    const id = req.params.id;
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
      deleted: false
    });
    if(!accountDetail) {
      res.redirect(`/${pathAdmin}/settings/adminAccount`);
      return;
    }
    const roleList = await role.find({deleted:false});
    res.render('admin/pages/edit-account-manager.pug', {
      pageTitle:"Chỉnh sửa tài khoản quản trị",
      accountDetail: accountDetail,
      roleList:roleList
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/settings/adminAccount`);
  }
}

module.exports.accountAdminEditPatch = async (req, res) => {
  try {
    const id = req.params.id;
  
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
      deleted: false
    })

    if(!accountDetail) {
      res.json({
        code: "error",
        message: "Tài khoản không tồn tại!"
      });
      return;
    }

    const existEmail = await AccountAdmin.findOne({
      _id: { $ne: id }, 
      email: req.body.email
    })

    if(existEmail) {
      res.json({
        code: "error",
        message: "Email đã tồn tại trong hệ thống!"
      })
      return;
    }

    if(req.file) {
      req.body.avatar = req.file.path;
    } else {
      req.body.avatar = "";
    }

    req.body.updatedBy = req.account.id;

    await AccountAdmin.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
      message: "Đã cập nhật khoản quản trị!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Email không tồn tại!"
    });
  }
}

module.exports.removeAccount = async (req, res) => {
  try {
    const id = req.params.id;
  
    const accountDetail = await AccountAdmin.findOne({
      _id: id,
      deleted: false
    })

    if(!accountDetail) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ!"
      })
      return;
    }

    await AccountAdmin.deleteOne({
      _id: id
    }, {
      deleted: true
    });
    res.json({
      code: "success",
      message: "Đã xóa tài khoản!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}
module.exports.changeMultiPatch = async (req, res) => {
  try {
    const {listId, option} = req.body;
    switch(option){
      case "active":
      case "inactive":
      case "initial":
        await AccountAdmin.updateMany(
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

module.exports.roleAdmin = async (req, res) => {
  const find = {
    deleted: false
  };
  // lọc theo ô input
  if(req.query.keyword){
    let regex = req.query.keyword.trim();
    regex = regex.replace(/\s+/g, " ")
    regex =slugify(regex)
    regex = new RegExp(regex, "i");
    find.slug=regex;  
  }
  const roleList = await role
    .find(find)
    .sort({
      createdAt: "desc"
    }) 
  res.render('admin/pages/right.pug', {
    pageTitle:"Nhóm quyền",
    roleList:roleList
  });
}

module.exports.createRole = (req, res) => {
  res.render('admin/pages/create-right.pug', {
    pageTitle:"Tạo nhóm quyền",
    permissions: permissions
  });
}

module.exports.createRolePost = async (req, res) => {
  req.body.createdBy = req.account.id
  const newRole = new role(req.body);
  await newRole.save();
  res.json({
    code:"success",
    message: "Tạo nhóm quyền thành công!"
  })
}
module.exports.roleEdit = async (req, res) => {
  try {
    const id = req.params.id;
  
    const roleDetail = await role.findOne({
      _id: id,
      deleted: false
    })

    if(!roleDetail) {
      res.redirect(`/${pathAdmin}/settings/roleAdmin`);
      return;
    }

    res.render('admin/pages/edit-role', {
      pageTitle: "Chỉnh sửa nhóm quyền",
      permissions: permissions,
      roleDetail: roleDetail
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/settings/roleAdmin`);
  }
}

module.exports.roleEditPatch = async (req, res) => {
  try {
    const id = req.params.id;
  
    const roleDetail = await role.findOne({
      _id: id,
      deleted: false
    })

    if(!roleDetail) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ!"
      })
      return;
    }

    await role.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.json({
      code: "success",
      message: "Cập nhật thành công!"
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    });
  }
}

module.exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const roleDetail = await role.findOne({
      _id: id,
      deleted: false
    })

    if(!roleDetail) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ!"
      })
      return;
    }

    await roleDetail.deleteOne({
      _id: id,
      deleted: true
    });

    res.json({
      code: "success",
      message: "Đã xóa nhóm quyền !"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}
module.exports.trashMultiPatchRole = async (req, res) => {
  const { listId, option } = req.body;
  if (!Array.isArray(listId) || !option) {
    return res.json({ code: 'error', message: 'Dữ liệu không hợp lệ!' });
  }
  try {
    if (option == 'remove') {
      await role.deleteMany({ _id: { $in: listId }, deleted: false });
      return res.json({ code: 'success', message: 'Đã xóa vĩnh viễn các bản ghi!' });
    }
    return res.json({ code: 'error', message: 'Dữ liệu không hợp lệ!' });
  } catch (e) {
    return res.json({ code: 'error', message: 'Có lỗi xảy ra!' });
  }
};


