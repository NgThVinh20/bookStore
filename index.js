// nhúng thư viện express 

const express = require('express');
require('dotenv').config();

// kết nối tới csdl
const connectDB = require('./config/database.config.js');
connectDB();

const adminRouter = require("./routes/admin/index.route.js");
const clientRouter = require("./routes/client/index.route.js");
const { pathAdmin } = require('./config/variable.config.js');


const path = require('path')
const app = express()
const port = 1000



// thiết lập thư mục chứa file view
app.set('views', path.join(__dirname, "views"))

// thiết lập pug làm view engine
app.set('view engine', 'pug')

// thiết lập thư mục public chứa các file tĩnh file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

// tạo biến toàn cục trong file pug
app.locals.pathAdmin = "admin"


app.use('/', clientRouter);
app.use(`/${pathAdmin}`, adminRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// az9vinh_db_user
// 20122005
