const router = require("express").Router();
const accountRoutes = require("./account.route.js")
const dashboardRoutes = require("./dashboard.route.js")
const categoryRoutes = require("./category.route.js")
const bookRoutes = require("./book.route.js")
const orderRoutes = require("./order.route.js")
const clientRoutes = require("./client.route.js")
const contactRoutes = require("./contact.route.js")
const settingRoutes = require("./setting.route.js")
const profileRoutes = require("./profile.route.js")
const authMiddleware = require("../../middlewares/admin/auth.middleware.js");



router.use('/account', accountRoutes);
router.use('/dashboard',authMiddleware.verifyToken, dashboardRoutes);
router.use('/category',authMiddleware.verifyToken, categoryRoutes);
router.use('/books',authMiddleware.verifyToken, bookRoutes);
router.use('/orders',authMiddleware.verifyToken, orderRoutes);
router.use('/clients',authMiddleware.verifyToken, clientRoutes);
router.use('/contacts',authMiddleware.verifyToken, contactRoutes);
router.use('/settings',authMiddleware.verifyToken, settingRoutes);
router.use('/profile',authMiddleware.verifyToken, profileRoutes);


router.use(authMiddleware.verifyToken,(req, res) => {
  res.render('admin/pages/NotFound.pug', {
    pageTitle:"Not Found"
  });
});

module.exports = router;