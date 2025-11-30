const router = require("express").Router();
const homeRoutes = require("./home.route")
const booksRoutes = require("./books.route")
const cartRoutes = require("./cart.route")
router.use('/',homeRoutes);
router.use('/books',booksRoutes);
router.use('/cart',cartRoutes);
module.exports = router;