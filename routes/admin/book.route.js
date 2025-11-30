const router = require("express").Router();
const bookController = require("../../controllers/admin/book.controller.js");

router.get('/list', bookController.list);
router.get('/create', bookController.create);
router.get('/trash', bookController.trash);

module.exports = router;