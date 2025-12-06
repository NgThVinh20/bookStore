const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    Password: String,
    status: String
  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);

const AccountAdmin = mongoose.model('AccountAdmin', schema, "accounts_admin");

module.exports = AccountAdmin;
