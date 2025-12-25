const router = require("express").Router();

const orderController = require("../../controllers/client/order.controller.js");

router.post('/create', orderController.create);

module.exports = router;