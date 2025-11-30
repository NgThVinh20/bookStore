module.exports.login = (req, res) => {
  res.render('admin/pages/login.pug', {
    pageTitle:"Trang đăng nhập"
  });
}


module.exports.register = (req, res) => {
  res.render('admin/pages/register.pug', {
    pageTitle:"Trang đăng ký"
  });
}

module.exports.forgotPassword = (req, res) => {
  res.render('admin/pages/forget-password.pug', {
    pageTitle:"Trang quên mật khẩu"
  });
}