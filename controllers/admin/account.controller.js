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

module.exports.resetPassword = (req, res) => {
  res.render('admin/pages/change-password.pug', {
    pageTitle:"Trang đổi mật khẩu"
  });
}

module.exports.OTP = (req, res) => {
  res.render('admin/pages/OTP.pug', {
    pageTitle:"Trang nhập mã OTP"
  });
}