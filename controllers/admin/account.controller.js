const AccountAdmin = require("../../models/accountAdmin.model")
const ForgotPassword = require("../../models/forgot-password.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {generateNum} = require("../../helpers/generate.helper")
const {sendMail} = require("../../helpers/mail.helper")


// login
module.exports.login = (req, res) => {
  res.render('admin/pages/login.pug', {
    pageTitle:"Trang đăng nhập"
  });
}
module.exports.loginPost = async (req, res) => {
  const { email, PassWord,rememberPassword } = req.body;
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
      rememberPassword: existAccount.rememberPassword
    },
    process.env.JWT_Secret,
    {
      expiresIn: rememberPassword ? "7d" : "1d"
    }
  );
  // lưu token vào cookie
  res.cookie("token",token, {
    maxAge: rememberPassword ? (7* 24 *60 *60*1000) : (24 *60 *60*1000) ,
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



// register
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
  console.log(req.body);
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

module.exports.forgotPasswordPost = async (req, res) => {
  const {email} = req.body;
  // console.log(email);

  // kiểm tra email tồn tại trong hệ thống
  const existAccount = await AccountAdmin.findOne({
    email:email,
    status: "active"
  })
  // console.log(existAccount);
  if(!existAccount){
    res.json({
      code: "error",
      message: "email không tồn tại trong hệ thống!"
    });
    return;
  }
  // Kiểm tra email đã tồn tại trong ForgotPassword chưa
  const existEmailOtp = await ForgotPassword.findOne({
    email:email,
  })
  if(existEmailOtp){
    res.json({
      code: "error",
      message: "Vui lòng gửi lại yêu cầu sau 5 phút!"
    });
    return;
  }

  // Tạo mã OTP
  const otp = generateNum(4);
  // console.log(otp);
  // Lưu vào csdl ( sau 5p tự động xóa)
  const record = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: Date.now() + 5*60*1000
  });
  // console.log(record)
  await record.save();


  // gửi mã OTP qua email tự động cho khách hàng
  const subject = "Mã OTP lấy lại mật khẩu";
  const content = `Max OTP của bạn là: <b>${otp}</b>. Mã OTP có hiệu lực trong vòng 5 phút, vui lòng không cung cấp mã OTP cho bất kỳ ai `
  sendMail(email,subject,content);
  res.json({
    code: "success",
    message: "Đã gửi mã OTP qua email!"
  });

}




module.exports.OTP = (req, res) => {
  res.render('admin/pages/OTP.pug', {
    pageTitle:"Trang nhập mã OTP"
  });
}
module.exports.OtpPassWordPost = async (req, res) => {
  const {email, otp} = req.body;
  // console.log(email);

  // kiểm tra email tồn tại trong hệ thống
  const existAccount = await AccountAdmin.findOne({
    email:email,
    status: "active"
  })
  // console.log(existAccount);
  if(!existAccount){
    res.json({
      code: "error",
      message: "email không tồn tại trong hệ thống!"
    });
    return;
  }
  // Kiểm tra email, otp đã tồn tại trong ForgotPassword chưa
  const existRecord = await ForgotPassword.findOne({
    email:email,
    otp:otp
  })
  if(!existRecord){
    res.json({
      code: "error",
      message: "Mã OTP không hợp lệ"
    });
    return;
  }

   // tạo jwt
  const token = jwt.sign(
    {
      id : existAccount.id,
      email: existAccount.email,
      rememberPassword: existAccount.rememberPassword
    },
    process.env.JWT_Secret,
    {
      expiresIn: "1d"
    }
  );
  // lưu token vào cookie
  res.cookie("token",token, {
    maxAge: (24 *60 *60*1000) ,
    // chỉ cho phép cookie được truy cập bởi server
    httpOnly:true, 
    // không cho phép lấy cookie từ tên miền khác
    sameSite: "strict", 
  })


   res.json({
      code: "success",
      message: "Xác nhận mã OTP thành công"
    });
}


module.exports.resetPassword = (req, res) => {
  res.render('admin/pages/change-password.pug', {
    pageTitle:"Trang đổi mật khẩu"
  });
}
module.exports.resetPasswordPost = async (req, res) => {
  const {password} = req.body;
    // mã hóa mật khẩu
  const PasswordHash = await bcrypt.hash(password, 10);
  await AccountAdmin.updateOne(
    {
     _id:req.account.id
    },
    {
      Password: PasswordHash
    }
)
  res.json({
    code: "success",
    message: "Đổi mật khẩu thành công!"
  });
}