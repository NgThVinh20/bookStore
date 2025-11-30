
const router = require("express").Router();
const accountRoutes = require("./account.route.js")


router.use('/account',accountRoutes)

module.exports = router;