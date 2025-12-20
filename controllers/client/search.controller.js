
const Category = require("../../models/category.model")
const Book = require("../../models/book.model")
const moment = require("moment");
const slugify = require("slugify");
module.exports.list = async (req, res) => {
  const find = {
    status:"active",
    deleted:false
  }
  // lọc theo tên sách
  if (req.query.nameBook) {
      const nameBookSlug = slugify(req.query.nameBook);
      find.slug = new RegExp(nameBookSlug, "i");
    }
  // lọc theo tên tác giả
  if(req.query.author){
    find.author = req.query.author
  }
  // lọc theo tên danh mục
  if(req.query.category){
    const category = await Category.findOne({
      slug:req.query.category
    })
    if(category){
      find.parent= category.id
    }
  }
  // lọc theo giá
   if (req.query.price) {
      const [priceMin, priceMax] = req.query.price
        .split("-")
        .map((item) => parseInt(item));
      find.priceNew = {
        $gte: priceMin,
        $lte: priceMax,
      };
    }
  const bookList = await Book.find(find)
  for(const item of bookList){
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
  console.log(bookList)
  res.render('client/pages/search.pug', {
    pageTitle:"Kết quả tìm kiếm",
    bookList: bookList
  });
}


