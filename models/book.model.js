const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);


const schema = new mongoose.Schema(
  {
    name: String,
    parent: String,
    position: Number,
    status: String,
    avatar: String,
    time: Date,
    amount: Number,
    priceOld: Number,
    priceNew: Number,
    author: String,
    infor: String,
    createdBy: String,
    updatedBy: String,
    updatedAt: Date,
    slug: {
      type: String,
      slug: "name",
      unique: true
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy: String,
    deletedAt: Date
  },
  {
    timestamps: true, // Tự động sinh ra trường createdAt và updatedAt
  }
);
const Tour = mongoose.model('Book', schema, "books");
module.exports = Tour;



