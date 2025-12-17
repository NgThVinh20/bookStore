
const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const schema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    numberPhone: String,
    role: String,
    level: String,
    status: String, // initial: Khởi tạo, active: Hoạt động, inactive: Tạm dừng
    Password: String,
    avatar: String,
    createdBy: String,
    updatedBy: String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy: String,
    deletedAt: Date,
    slug: {
      type: String,
      slug: "fullname",
      unique: true,
      sparse: true
    },
  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);



const AccountAdmin = mongoose.model('AccountAdmin', schema, "accounts_admin");

module.exports = AccountAdmin;
