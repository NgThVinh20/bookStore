module.exports.list = (req, res) => {
  res.render('admin/pages/settings.pug', {
    pageTitle:"Cài đặt chung"
  });
} 


module.exports.info = (req, res) => {
  res.render('admin/pages/information-website.pug', {
    pageTitle:"Thông tin website"
  });
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
