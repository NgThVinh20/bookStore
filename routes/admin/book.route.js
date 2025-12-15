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

router.get('/edit/:id', bookController.edit)
router.patch('/edit/:id',upload.single('avatar'), bookValidate.createPost, bookController.editPatch)

router.get('/trash', bookController.trash);

router.patch('/change-multi', bookValidate.changeMultiPatch, bookController.changeMultiPatch)

// Multi remove/undo for trash
router.patch('/trash-multi', bookController.trashMultiPatch);

router.patch('/delete/:id', bookController.deletePatch)
router.patch('/undo/:id', bookController.undoPatch)

router.delete('/remove/:id', bookController.remove)
module.exports = router;