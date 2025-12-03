const AccountAdmin = require("../../models/accountAdmin.model")
const bcrypt = require("bcryptjs");

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

module.exports.registerPost = async(req, res) => {
   const existAccount = await AccountAdmin.findOne({
    email: req.body.email
  });

  if(existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  req.body.status = "initial"; // Khởi tạo

  // mã hóa mật khẩu
  req.body.Password = await bcrypt.hash(req.body.Password, 10);

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!"
  });

}
module.exports.registerInitial = (req, res) => {
  res.render('admin/pages/register-initial.pug', {
    pageTitle:"Tài khoản đã được khởi tạo"
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