module.exports.home = (req, res) => {
  res.render('client/pages/index.pug', {
    pageTitle:"Trang chủ"
  });
}


