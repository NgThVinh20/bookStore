const router = require("express").Router();

const categoryController = require("../../controllers/client/category.controller.js");

router.get('/:slug',categoryController.list)

module.exports = router;