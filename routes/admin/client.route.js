const router = require("express").Router();
const clientController = require("../../controllers/admin/client.controller.js");

router.get('/list', clientController.list);
// router.get('/edit', userController.edit);
// router.get('/trash', orderController.trash);

module.exports = router;