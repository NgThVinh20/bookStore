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

