const mongoose = require('mongoose');

const connectDatabase = async () => {
  try{
    await mongoose.connect(process.env.DATABASE);
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch(error){
    console.log("Kết nối đến cơ sở dữ liệu thất bại");
  }
}
module.exports = connectDatabase;
