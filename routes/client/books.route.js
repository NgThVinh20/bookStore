const router = require("express").Router();

const booksController = require("../../controllers/client/books.controller.js");

router.get('/', booksController.books);
router.get('/detail', booksController.detail);

module.exports = router;