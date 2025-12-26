const router = require("express").Router();
const dashboardController = require("../../controllers/admin/dashboard.controller.js");
router.get('/', dashboardController.dashboard);
router.post('/chart', dashboardController.chart);
module.exports = router;