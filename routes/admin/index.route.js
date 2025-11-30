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




router.use('/account', accountRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/category', categoryRoutes);
router.use('/books', bookRoutes);
router.use('/orders', orderRoutes);
router.use('/clients', clientRoutes);
router.use('/contacts', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/profile', profileRoutes);


router.use((req, res) => {
  res.render('admin/pages/NotFound.pug', {
    pageTitle:"Not Found"
  });
});

module.exports = router;