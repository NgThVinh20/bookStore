const router = require("express").Router();

const cartController = require("../../controllers/client/cart.controller.js");

router.get('/', cartController.cart);
router.post('/render', cartController.render);
module.exports = router;