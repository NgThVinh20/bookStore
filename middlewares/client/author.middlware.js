const Book = require("../../models/book.model");
module.exports.list = async (req, res, next) => {
   const authorList = await Book.distinct("author", {
    deleted: false,
    status: "active"
  })
  res.locals.authorList = authorList;
  next();
}
