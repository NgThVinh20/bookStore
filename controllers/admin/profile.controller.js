const AccountAdmin = require("../../models/accountAdmin.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
module.exports.info = (req, res) => {
  res.render('admin/pages/information-user.pug', {
    pageTitle:"Thông tin cá nhân"
  });
} 
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.account.id
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

    if (req.body.name) {
      req.body.fullname = req.body.name;
      delete req.body.name; 
    }

    await AccountAdmin.updateOne({
      _id: id,
      deleted: false
    }, req.body);
    // tạo jwt
    const token = jwt.sign(
      {
        id : id,
        email: req.body.email,
      },
      process.env.JWT_Secret,
      {
        expiresIn: "1d"
      }
    );
    // lưu token vào cookie
    res.cookie("token",token, {
      maxAge:  (24 *60 *60*1000) ,
      // chỉ cho phép cookie được truy cập bởi server
      httpOnly:true, 
      // không cho phép lấy cookie từ tên miền khác
      sameSite: "strict", 
    })
    res.json({
      code: "success",
      message: "Đã cập nhật thông tin !"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    });
  }
}
module.exports.editPassword = (req, res) => {
  res.render('admin/pages/change-password-manager.pug', {
    pageTitle:"Đổi mật khẩu"
  });
} 

module.exports.editPasswordPatch = async (req, res) => {
  const id = req.account.id;
  // Mã hóa mật khẩu
  req.body.Password = await bcrypt.hash(req.body.Password, 10);

  req.body.updatedBy = req.account.id;

  await AccountAdmin.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  res.json({
    code: "success",
    message: "Đã đổi mật khẩu thành công!"
  })

}