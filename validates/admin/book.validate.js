const Joi = require('joi');

module.exports.createPost = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Vui lòng nhập tên sản phẩm!"
      }),
      parent: Joi.string().allow(''),
      position: Joi.string().allow(''),
      status: Joi.string().allow(''),
      discount:Joi.string().allow(''),
      suggested:Joi.string().allow(''),
      avatar: Joi.string().allow(''),
      time : Joi.string().allow(''),
      amount : Joi.string().allow(''),
      priceNew : Joi.string().allow(''),
      priceOld : Joi.string().allow(''),
      author :Joi.string().allow(''),
      infor: Joi.string().allow(''),
      images:Joi.string().allow(''),
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

module.exports.changeMultiPatch = async (req, res, next) => {
  const schema = Joi.object({
    listId: Joi.array()
      .required()
      .messages({
        "any.empty": "Vui lòng chọn ít nhất 1 bản ghi!"
      }),
    option: Joi.string()
      .required()
      .messages({
        "string.empty": "Vui lòng chọn hành động để áp dụng!"
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
