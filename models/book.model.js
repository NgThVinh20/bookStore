const mongoose = require('mongoose');

module.exports.book = mongoose.model(
  'book',
   {
      name: String,
      author:String,
      NXB:String,
      type:String
    },
    "books"
);

console.log(book);
