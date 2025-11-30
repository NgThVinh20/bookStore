module.exports.books = (req, res) => {
  res.render('client/pages/danh-sach-sach.pug', {
    pageTitle:"Danh sách sách"
  });
}
module.exports.detail = (req, res) => {
  res.render('client/pages/chi-tiet-sach.pug', {
    pageTitle:"Chi tiết sách"
  });
}


