const Joi = require('joi');

module.exports.registerPost = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .min(5)
      .max(50)
      .required()
      .messages({
        "string.empty": "Vui lòng nhập họ tên!",
        "string.min": "Vui lòng nhập ít nhất 5 ký tự!",
        "string.max": "Vui lòng nhập tối đa 50 ký tự!",
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Email không đúng định dạng!",
      }),
    Password: Joi.string()
      .min(8)
      .custom((value, helpers) => {
        if(!/[a-z]/.test(value)) {
          return helpers.error('password.lowercase');
        }
        if(!/[A-Z]/.test(value)) {
          return helpers.error('password.uppercase');
        }
        if(!/\d/.test(value)) {
          return helpers.error('password.number');
        }
        if(!/[^A-Za-z0-9]/.test(value)) {
          return helpers.error('password.special');
        }
        return value;
      })
      .required()
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
        "string.min": "Mật khẩu phải có ít nhất 8 ký tự!",
        "password.lowercase": "Mật khẩu phải chứa ký tự thường!",
        "password.uppercase": "Mật khẩu phải chứa ký tự hoa!",
        "password.number": "Mật khẩu phải chứa chữ số!",
        "password.special": "Mật khẩu phải chứa ký tự đặc biệt!",
      }),

  })

  const { error } = schema.validate(req.body);
  if(error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}


// validate login
module.exports.loginPost = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Email không đúng định dạng!",
      }),
    PassWord: Joi.string()
      .required()
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
      }),
  })

  const { error } = schema.validate(req.body);
  if(error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}