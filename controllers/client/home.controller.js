const Book = require("../../models/book.model")
const Category = require("../../models/category.model")
const moment = require("moment");
const categoryHelper = require("../../helpers/category.helper")

module.exports.home = async (req, res) => {
  // section-2
  const BookListDiscount = await Book.find({
    deleted:false,
    status:"active",
    discount:"true"
  }).sort({
    positon:"desc"
  })
  for(const item of BookListDiscount){
    if(item.parent){
      const category = await Category.findOne({
        _id: item.parent
      })
      item.parentName = category.name;
    }
    if(item.time){
        item.timeFormat = moment(item.time).format("DD/MM/YYYY")
    }
  
    item.priceDiscount = Math.round(((item.priceOld - item.priceNew) / item.priceOld) * 100);
  
  }
  // section-2

  // section-3
  const categoryListParent = await Category.find({
    deleted:false,
    status:"active",
    parent:""
  }).sort({
    position:"desc"
  })
  // section-3

  // section-4
  const constBookListSection4 = await Book.find({
    deleted:false,
    status:"active",
    suggested:"true"
  }).sort({
    positon:"desc"
  })
  for(const item of constBookListSection4){
    if(item.parent){
      const category = await Category.findOne({
        _id: item.parent
      })
      item.parentName = category.name;
    }
    if(item.time){
        item.timeFormat = moment(item.time).format("DD/MM/YYYY")
    }
    item.priceDiscount = Math.round(((item.priceOld - item.priceNew) / item.priceOld) * 100);
  }
  // section-4
  // section-5
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const constBookListSection6 = await Book.find({
    deleted: false,
    status: "active",
    time: { $gte: oneMonthAgo }
  }).sort({
     time: "asc"
  });
  for(const item of constBookListSection6){
    if(item.parent){
      const category = await Category.findOne({
        _id: item.parent
      })
      item.parentName = category.name;
    }
    if(item.time){
        item.timeFormat = moment(item.time).format("DD/MM/YYYY")
    }
    item.priceDiscount = Math.round(((item.priceOld - item.priceNew) / item.priceOld) * 100);
  }
  // section-5

  res.render('client/pages/index.pug', {
    pageTitle:"Trang chủ",
    BookListDiscount:BookListDiscount,
    categoryListParent:categoryListParent,
    constBookListSection4:constBookListSection4,
    constBookListSection6:constBookListSection6
  });
}


