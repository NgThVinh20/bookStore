module.exports.list = (req, res) => {
  res.render('admin/pages/manage-order.pug', {
    pageTitle:"Trang Quản lý đơn hàng"
  });
} 


module.exports.edit = (req, res) => {
  res.render('admin/pages/order.pug', {
    pageTitle:"Trang chỉnh sửa đơn hàng"
  });
} 

// module.exports.trash = (req, res) => {
//   res.render('admin/pages/trash-product.pug', {
//     pageTitle:"Trang thùng rác"
//   });
// } 
