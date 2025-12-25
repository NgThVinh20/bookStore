const Order = require("../../models/order.model.js");
module.exports.list = async (req, res) => {
  const find = {
    deleted: false
  };
  // lọc theo ô input
  if(req.query.keyword){
      let regex = req.query.keyword.trim();
      regex = regex.replace(/\s+/g, " ")
      regex = new RegExp(regex, "i");
      find.fullName=regex;  
    }
  const orderList = await Order.find(find);
  console.log(orderList)
  res.render('admin/pages/client.pug', {
    pageTitle:"Trang Quản lý  khách hàng",
    orderList: orderList
  });
} 
