
const mongoose = require('mongoose');

const connectDatabase = async () => {
  try{
    console.log("Đang kết nối tới:", process.env.DATABASE);
    await mongoose.connect(process.env.DATABASE);
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch(error){
    console.log("Kết nối đến cơ sở dữ liệu thất bại");
    console.log("Chi tiết lỗi:", error.message);
  }
}
module.exports = connectDatabase;
