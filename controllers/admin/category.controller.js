const Category = require("../../models/category.model")

module.exports.list = (req, res) => {
  res.render('admin/pages/category.list.pug', {
    pageTitle:"Trang Quản lý danh mục"
  });
} 


module.exports.create = (req, res) => {
  res.render('admin/pages/category-create.pug', {
    pageTitle:"Trang Quản tạo danh mục"
  });
} 

module.exports.createPost = async (req, res) => {
  console.log(req.file);
  if(req.file){
    req.body.avatar=req.file.path;
  }else{
    req.body.avatar="";
  }

  if(req.body.position){
    req.body.position = parseInt(req.body.position)
  } else {
    const record = await Category.findOne({}).sort({
      positon:"desc" 
    })
    if(record){
      req.body.position = record.position+1;
    }else{
      req.body.position=1;
    }
  }
  req.body.createdBy = req.account.id;
  const newRecord = new  Category(req.body);
  await newRecord.save();

  // console.log(req.body);
  res.json({
    code: "success",
    message: "Đã tạo danh mục!"
  });
}