const router = require("express").Router();
const homeRoutes = require("./home.route")
const booksRoutes = require("./books.route")
const cartRoutes = require("./cart.route")
const categoryRoutes = require("./category.route")
const settingMiddleWare = require("../../middlewares/client/setting.middleware")
const categoryMiddleWare = require("../../middlewares/client/category.middleware")

router.use(settingMiddleWare.websiteInfor);
router.use(categoryMiddleWare.list);
router.use('/',homeRoutes);
router.use('/books',booksRoutes);
router.use('/cart',cartRoutes);
router.use('/category',categoryRoutes);
module.exports = router;