module.exports.info = (req, res) => {
  res.render('admin/pages/information-user.pug', {
    pageTitle:"Thông tin cá nhân"
  });
} 

module.exports.editPassword = (req, res) => {
  res.render('admin/pages/change-password-manager.pug', {
    pageTitle:"Đổi mật khẩu"
  });
} 