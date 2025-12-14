const router = require("express").Router();
const bookController = require("../../controllers/admin/book.controller.js");
const bookValidate = require("../../validates/admin/book.validate.js");
const cloudinaryHelper = require("../../helpers/cloudinary.helper.js");
const multer  = require('multer')
const upload = multer({
  storage: cloudinaryHelper.storage
});
router.get('/list', bookController.list);
router.get('/create', bookController.create);
router.post('/create', upload.single('avatar'), bookValidate.createPost,
bookController.createPost);
router.get('/trash', bookController.trash);

module.exports = router;