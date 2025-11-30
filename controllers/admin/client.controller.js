module.exports.list = (req, res) => {
  res.render('admin/pages/client.pug', {
    pageTitle:"Trang Quản lý  khách hàng"
  });
} 


// module.exports.edit = (req, res) => {
//   res.render('admin/pages/order.pug', {
//     pageTitle:"Trang chỉnh sửa đơn hàng"
//   });
// } 

// module.exports.trash = (req, res) => {
//   res.render('admin/pages/trash-product.pug', {
//     pageTitle:"Trang thùng rác"
//   });
// } 
