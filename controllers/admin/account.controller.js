const AccountAdmin = require("../../models/accountAdmin.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  res.render('admin/pages/login.pug', {
    pageTitle:"Trang đăng nhập"
  });
}
module.exports.loginPost = async (req, res) => {
  const { email, PassWord } = req.body;
  // kiểm tra email
  const existAccount =  await AccountAdmin.findOne({
    email: email
  });
  if(!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  } 
  // kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(PassWord, existAccount.Password);
  if(!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!"
    });
    return;
  }
  // kiểm tra trạng thái tài khoản
   if(existAccount.status != "active") {
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt!"
    });
    return;
  }
  // tạo jwt
  const token = jwt.sign(
    {
      id : existAccount.id,
      email: existAccount.email,
    },
    process.env.JWT_Secret,
    {
      expiresIn:"1d"
    }
  );
  // lưu token vào cookie
  res.cookie("token",token, {
    maxAge:24 *60 *60*1000,
    // chỉ cho phép cookie được truy cập bởi server
    httpOnly:true, 
    // không cho phép lấy cookie từ tên miền khác
    sameSite: "strict", 
  })
  res.json({
    code: "success",
    message: "Đăng nhập khoản thành công!"
  });
}


// đăng xuất
module.exports.logOut = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/account/login`);
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
  // console.log(req.body);
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