const Book = require("../../models/book.model")
const Category = require("../../models/category.model")
const moment = require("moment");
module.exports.cart = (req, res) => {
  res.render('client/pages/gio-hang.pug', {
    pageTitle:"Giỏ hàng"
  });
}



 module.exports.render = async (req, res) => {
  try {
    const cart = req.body.cart;
    const cartDetail = [];
    for(const item of cart){
      const bookDetail = await Book.findOne({
        _id:item.bookID,
        deleted:false,
        status:"active"
      })
      if(bookDetail.parent){
        const category = await Category.findOne({
          _id: bookDetail.parent
        })
        bookDetail.parentName = category.name;
      }
      if(bookDetail){
        cartDetail.push({
          bookID: item.bookID,
          quantity: item.quantity,
          avatar: bookDetail.avatar,
          name: bookDetail.name,
          priceNew: bookDetail.priceNew,
          author: bookDetail.author,
          time: moment(bookDetail.time).format("DD/MM/YYYY"),
          parent: bookDetail.parent,
          parentName: bookDetail.parentName,
          slug: bookDetail.slug,
          amount: bookDetail.amount
        }) 
      }
    }
  res.json({
    code:"success",
    message:"Thành công",
    cartDetail:cartDetail
  })
  } 
  catch (error) {
    res.json({
    code:"error",
    message:"Thất bại",
   })
  }
}
