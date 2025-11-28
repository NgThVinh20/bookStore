// nhúng thư viện express 
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// thiết lập thư mục chứa file view
app.set('views', path.join(__dirname, "views"))

// thiết lập pug làm view engine
app.set('view engine', 'pug')

// thiết lập thư mục public chứa các file tĩnh file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('client/pages/index.pug',{
    pageTitle:"Trang chủ",
  })
})
app.get('/account/admin/login', (req, res) => {
  res.render('admin/pages/login.pug',{
    pageTitle:"Trang chủ",
  })
})
app.get('/books', (req, res) => {
  res.render('client/pages/danh-sach-sach',{
    pageTitle:"Trang danh sách sách",
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
