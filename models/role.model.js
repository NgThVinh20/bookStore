const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    permissions: Array,
    createdBy: String,
    updatedBy: String,
    deleted:{
      type: Boolean,
      default: false
    },
    deletedBy: String,
    deletedAt: Date,
    slug: {
      type: String,
      slug: "name",
      unique: true
    },
  },
  {
    timestamps: true // Tự động sinh ra trường createdAt và updatedAt
  }
);

const role = mongoose.model('role', schema, "role");

module.exports = role;
