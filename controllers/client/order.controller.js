 const {generateNum} = require("../../helpers/generate.helper");
 const moment = require("moment");
 const Book = require("../../models/book.model");
 const Order = require("../../models/order.model");
 const Category = require("../../models/category.model");
 const {paymentMethodList} = require("../../config/variable.config");
 const {paymentStatusList} = require("../../config/variable.config");
 const {statusList} = require("../../config/variable.config");

 module.exports.create = async (req, res) => {
  try {
    console.log(req.body);
  // mã đơn hàng
  req.body.code="OD"+generateNum(6);
  // tạm tính
  req.body.subTotal =0;


  // danh sách sách
  for(const item of req.body.items){
    const itemInfor = await Book.findOne({
      _id:item.bookID,
      deleted:false,
      status:"active"
    })
    if(itemInfor){
      item.priceNew = itemInfor.priceNew;
      item.name = itemInfor.name;
      item.avatar = itemInfor.avatar;
      req.body.subTotal += item.priceNew * item.quantity;
      item.time = moment(itemInfor.time).format("DD/MM/YYYY");
      // cập nhật số lượng còn lại của tour
      await Book.updateOne({
        _id:item.bookID
      },{
        $inc:{
          amount: -parseInt(item.quantity)
        }
      })
    }
  }
  // discount 
  req.body.discount = 0;
  // tổng tiền (sửa totalPrice thành total để khớp với model)
  req.body.total = req.body.subTotal - req.body.discount;
  // Trạng thái thanh toán
  req.body.paymentStatus = "unpaid";
  // Trạng thái đơn hàng
  req.body.status = "initial";

  const newRecord = new Order(req.body);
  await newRecord.save();
  res.json({
    code:"sucess",
    message:"Đặt hàng thành công",
    orderCode:req.body.code
  })
  } catch (error) {
    console.log(error);
    res.json({
    code:"error",
    message:"Đặt hàng thất bại"
  })
  }
 }
  module.exports.success = async (req, res) => {
    const {orderCode, phone} = req.query;
    const orderDetail = await Order.findOne({
      code:orderCode,
      phone:phone
    })
    if(!orderDetail){
      res.redirect("/");
      return;
    }
    const paymentMethodItem = paymentMethodList.find(item => item.value == orderDetail.paymentMethod);
    orderDetail.paymentMethodName = paymentMethodItem ? paymentMethodItem.label : "";

    const paymentStatus = paymentStatusList.find(item => item.value == orderDetail.paymentStatus);
    orderDetail.paymentStatusName = paymentStatus ? paymentStatus.label : "";

    const statusItem = statusList.find(item => item.value == orderDetail.status);
    orderDetail.statusName = statusItem ? statusItem.label : "";
    
    if(orderDetail){
      orderDetail.timeFormat = moment(orderDetail.time).format("DD/MM/YYYY") 
    }
    res.render('client/pages/order-success.pug', {
      pageTitle: "Đặt hàng thành công",
      orderDetail:orderDetail
  
    });
 }