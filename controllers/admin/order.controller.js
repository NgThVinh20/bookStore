const Order = require("../../models/order.model.js");
const moment = require("moment");
const Book = require("../../models/book.model.js");
const {paymentMethodList} = require("../../config/variable.config");
const {paymentStatusList} = require("../../config/variable.config");
const {statusList} = require("../../config/variable.config");
const Category = require("../../models/category.model.js");


module.exports.list = async (req, res) => {
  const find = {
    deleted: false
  };
  // lọc theo trạng thái 
  if(req.query.status) {
    find.status = req.query.status;
  }
  // lọc theo ngày tạo
  const filterDate = {}
    if(req.query.startDate){
      filterDate.$gte = moment(req.query.startDate).toDate()
      find.createdAt = filterDate;
    }
    if(req.query.endDate){
      filterDate.$lte = moment(req.query.endDate).toDate()
      find.createdAt =filterDate;
    }

    // lọc theo phương pháp thanh toán 
    if(req.query.paymentMethod) {
      find.paymentMethod = req.query.paymentMethod;
    }

    // lọc theo trạng thái thanh toán 
    if(req.query.paymentStatus) {
      find.paymentStatus = req.query.paymentStatus;
    }


  // Phân trang 
  const limitItem = 3;
  let page=1;
  if(req.query.page){
    page=parseInt(req.query.page);
  }
  const skip = (page-1)*limitItem
  const totalRecord = await Order.countDocuments(find);
  const totalPage = Math.ceil(totalRecord/limitItem);
  const pagination = {
    totalPage:totalPage,
    skip: skip,
    totalRecord:totalRecord
  }
  const orderList = await Order.find(find).sort({
    createdAt: "desc"
  }).limit(limitItem).skip(skip);
  
  for(const orderDetail of orderList){
    const paymentMethodItem = paymentMethodList.find(item => item.value == orderDetail.paymentMethod);
    orderDetail.paymentMethodName = paymentMethodItem ? paymentMethodItem.label : "";

    const paymentStatus = paymentStatusList.find(item => item.value == orderDetail.paymentStatus);
    orderDetail.paymentStatusName = paymentStatus ? paymentStatus.label : "";

    const statusItem = statusList.find(item => item.value == orderDetail.status);
    orderDetail.statusName = statusItem ? statusItem.label : "";

    orderDetail.statusClass = statusItem ? `tag-${statusItem.color}` : "";

    orderDetail.createdAtFormat = moment(orderDetail.createdAt).format("HH:mm-DD/MM/YYYY") 
    
  }
  res.render('admin/pages/manage-order.pug', {
    pageTitle:"Trang Quản lý đơn hàng",
    orderList: orderList,
    pagination: pagination,
    paymentMethodList: paymentMethodList,
    paymentStatusList: paymentStatusList,
    statusList: statusList
  });
} 


module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetail = await Order.findOne({
      _id: id,
      deleted: false
    });
    if(!orderDetail) {
      res.redirect(`/${pathAdmin}/orders/list`);
      return;
    }
    orderDetail.createdAtFormat = moment(orderDetail.createdAt).format("YYYY-MM-DDTHH:mm");
    for(const item of orderDetail.items){
      const bookDetail = await Book.findOne({
        _id: item.bookID,
        deleted: false
      });
      if(bookDetail){
        item.authorName = bookDetail.author
      }
      const categoryDetail = await Category.findOne({
        _id: bookDetail.parent,
        deleted: false
      });
      if(categoryDetail){
        item.categoryName = categoryDetail.name
      }
    }
    res.render('admin/pages/order.pug', {
      pageTitle:`Đơn hàng ${orderDetail.code}`,
      orderDetail: orderDetail,
      paymentMethodList: paymentMethodList,
      paymentStatusList: paymentStatusList,
      statusList: statusList
    });
  } catch (error) {
    res.redirect(`/${pathAdmin}/orders/list`);
  }
} 
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.updateOne({
      _id: id,
      deleted: false
    }, req.body);
    res.json({
      code: "success",
      message: "Cập nhật đơn hàng thành công!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Đơn hàng không hợp lệ!"
    })
  }
}

module.exports.changeMultiPatch = async (req, res) => {
  try {
    const {listId, option} = req.body;
    switch(option){
      case "initial":
      case "confirm":
      case "done":
      case "cancel":
        await Order.updateMany(
          {
          _id: {$in: listId},
          deleted:false 
          },{
            status:option,
            updatedBy : req.account.id
          }
        )
        res.json({
          code: "success",
          message: "Đã cập nhật trạng thái!"
        })
        break;
      case "remove":
        await Order.deleteMany(
          {
            _id: {$in: listId},
            deleted:false 
          }
        )
        res.json({
          code: "success",
          message: "Đã xóa các bản ghi!"
        })
        break;
      default:
        res.json({
          code: "error",
          message: "Dữ liệu không hợp lệ!"
        })
        break;
    }
  } catch (error) {
    res.json({
      code: "error",
      message: "Dữ liệu không hợp lệ!"
    })
  }
}
module.exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
  
    const orderDetail = await Order.findOne({
      _id: id,
      deleted: false
    })

    if(!orderDetail) {
      res.json({
        code: "error",
        message: "Dữ liệu không hợp lệ!"
      })
      return;
    }

    await Order.deleteOne({
      _id: id,
      deleted: false
    });
    res.json({
      code: "success",
      message: "Đã xóa đơn hàng!"
    })
  } catch (error) {
    res.json({
      code: "error",
      message: "Đơn hàng không tồn tại!"
    })
  }
}