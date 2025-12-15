const websiteInfor = require("../../models/websiteInfor.model.js");
const {permissions} = require("../../config/variable.config.js");
const role = require("../../models/role.model.js");
const slugify = require('slugify');

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



module.exports.adminAccount = (req, res) => {
  res.render('admin/pages/account-manager.pug', {
    pageTitle:"Tài khoản quản trị"
  });
} 
module.exports.adminCreate = (req, res) => {
  res.render('admin/pages/create-account-manager.pug', {
    pageTitle:"Tạo tài khoản quản trị"
  });
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
