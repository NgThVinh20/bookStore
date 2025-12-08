const router = require("express").Router();
const clientController = require("../../controllers/admin/client.controller.js");

router.get('/list', clientController.list);

module.exports = router;