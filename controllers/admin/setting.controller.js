const websiteInfor = require("../../models/websiteInfor.model.js");
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
module.exports.roleAdmin = (req, res) => {
  res.render('admin/pages/right.pug', {
    pageTitle:"Nhóm quyền"
  });
} 
module.exports.createRole = (req, res) => {
  res.render('admin/pages/create-right.pug', {
    pageTitle:"Tạo nhóm quyền"
  });
}
