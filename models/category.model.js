const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    parent: String,
    position:Number,
    status: String,
    avatar: String,
    desc: String,
    createdBy: String,
    updatedBy:String,
    slug:String,
    deleted:{
      type: Boolean,
      default:false
    },
    deletedBy: String,
    deleteAt:Date

  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);

const Category = mongoose.model('Category', schema, "category");

module.exports = Category;
