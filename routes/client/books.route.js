const router = require("express").Router();

const booksController = require("../../controllers/client/books.controller.js");


router.get('/detail/:slug', booksController.detail);
module.exports = router;