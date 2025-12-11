const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
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
    slug: { 
      type: String, 
      slug: "name" ,
      unique:true
    },
    deleted:{
      type: Boolean,
      default:false
    },
    deletedBy: String,
    deletedAt:Date
  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);

const Category = mongoose.model('Category', schema, "category");

module.exports = Category;
