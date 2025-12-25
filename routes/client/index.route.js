const router = require("express").Router();
const homeRoutes = require("./home.route")
const booksRoutes = require("./books.route")
const cartRoutes = require("./cart.route")
const orderRoutes = require("./order.route")
const categoryRoutes = require("./category.route")
const searchRoutes = require("./search.route")
const settingMiddleWare = require("../../middlewares/client/setting.middleware")
const categoryMiddleWare = require("../../middlewares/client/category.middleware")
const authorMiddleWare = require("../../middlewares/client/author.middlware")

router.use(settingMiddleWare.websiteInfor);
router.use(categoryMiddleWare.list);
router.use(authorMiddleWare.list);

router.use('/books',booksRoutes);
router.use('/cart',cartRoutes);
router.use('/order',orderRoutes);
router.use('/category',categoryRoutes);
router.use('/search',searchRoutes);
router.use('/',homeRoutes);
module.exports = router;