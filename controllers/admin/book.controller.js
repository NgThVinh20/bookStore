module.exports.list = (req, res) => {
  res.render('admin/pages/book-list.pug', {
    pageTitle:"Trang Quản lý sách"
  });
} 


module.exports.create = (req, res) => {
  res.render('admin/pages/product-create.pug', {
    pageTitle:"Trang tạo sản phẩm"
  });
} 

module.exports.trash = (req, res) => {
  res.render('admin/pages/trash-product.pug', {
    pageTitle:"Trang thùng rác"
  });
} 
