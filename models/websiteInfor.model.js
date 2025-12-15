const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    numberPhone: String,
    place: String,
    logo: String,
    favicon: String
  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);

const websiteInfor = mongoose.model('websiteInfor', schema, "websiteInfor");

module.exports = websiteInfor;
