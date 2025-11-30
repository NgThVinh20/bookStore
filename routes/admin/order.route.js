const router = require("express").Router();
const orderController = require("../../controllers/admin/order.controller.js");

router.get('/list', orderController.list);
router.get('/edit', orderController.edit);
// router.get('/trash', orderController.trash);

module.exports = router;