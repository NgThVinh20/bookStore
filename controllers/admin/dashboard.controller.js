const Order = require("../../models/order.model.js");
const moment = require("moment");
const accountAdmin = require("../../models/accountAdmin.model.js");
const Book = require("../../models/book.model.js");
const {paymentMethodList} = require("../../config/variable.config");
const {paymentStatusList} = require("../../config/variable.config");
const {statusList} = require("../../config/variable.config");
const Category = require("../../models/category.model.js");



module.exports.dashboard = async (req, res) => {
  const find = {
    deleted: false
  };
  const totalAdmin = await accountAdmin.countDocuments({
    deleted: false,
    status:"active"
  });
  const orderList = await Order.find({
    deleted: false,
    status: { $in: ['initial', 'confirm', 'done'] }
  }).sort({
    createdAt: -1,
  });
  const totalRevenue = orderList.reduce(
    (total, item) => total + item.total,
    0
  )
  const totalRecord = await Order.countDocuments(find);

  const newOrder = orderList.slice(0, 2);
  for (const order of newOrder) {
    for (const item of order.items) {
      if (item.bookID) {
        const bookDetail = await Book.findById(item.bookID);
        if (bookDetail) {
          item.bookName = bookDetail.name;
          item.avatar = bookDetail.avatar;
        }
        const category = await Category.findOne({
          _id: bookDetail.parent,
          deleted: false
        });
        if (category) {
          item.categoryName = category.name;
        }
      }
    }
    order.createdAtDay = moment(order.createdAt).format("DD/MM/YYYY"); 
    order.createdAthour = moment(order.createdAt).format("HH:mm"); 
    //  trạng thái thanh toán
    const paymentMethodItem = paymentMethodList.find(item => item.value == order.paymentMethod);
    order.paymentMethodName = paymentMethodItem ? paymentMethodItem.label : "";

    const paymentStatus = paymentStatusList.find(item => item.value == order.paymentStatus);
    order.paymentStatusName = paymentStatus ? paymentStatus.label : "";

    const statusItem = statusList.find(item => item.value == order.status);
    order.statusName = statusItem ? statusItem.label : "";

    order.statusClass = statusItem ? `tag-${statusItem.color}` : "";
   
  }
  res.render('admin/pages/dashboard.pug', {
    pageTitle:"Trang tổng quan",
    totalRecord: totalRecord,
    totalAdmin: totalAdmin,
    totalRevenue: totalRevenue,
    newOrder: newOrder
  });
} 

module.exports.chart = async (req, res) => {
  const {currentMonth, currentYear, previousMonth, previousYear, arrDays} = req.body;
  // tháng hiện tại
  const orderCurrent = await Order.find({
    deleted: false,
    createdAt: {
      $gte: new Date(currentYear, currentMonth - 1, 1),
      $lte: new Date(currentYear, currentMonth, 1)
    },
  })
  // tháng trước
  const orderPre = await Order.find({
    deleted: false,
    createdAt: {
      $gte: new Date(previousYear, previousMonth - 1, 1),
      $lte: new Date(previousYear, previousMonth, 1)
    },
  })
  // doanh thu theo ngày
  const dataMonthCurrent = [];
  for (const day of arrDays) {
    let res =0;
    for (const order of orderCurrent) {
      const orderDate = new Date(order.createdAt);
      const orderDay = orderDate.getDate();
      if (orderDay == day) {
        res += order.total;
        res += order.total;
      
      }
    }
    dataMonthCurrent.push(res);
  }
  const dataMonthPre = [];
   for (const day of arrDays) {
    let res =0;
    for (const order of orderPre) {
      const orderDate = new Date(order.createdAt);
      const orderDay = orderDate.getDate();
      if (orderDay == day) {
        res += order.total;
        res += order.total;
      
      }
    }
    dataMonthPre.push(res);
  }
  res.json({
    code:"success",
    message:"Thành công!",
    dataMonthCurrent:dataMonthCurrent,
    dataMonthPre:dataMonthPre
  })
}


