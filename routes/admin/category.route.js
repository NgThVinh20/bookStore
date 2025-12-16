const router = require("express").Router();
const categoryController = require("../../controllers/admin/category.controller.js");
const categoryValidate = require("../../validates/admin/category.validate.js");
const cloudinaryHelper = require("../../helpers/cloudinary.helper.js");
const multer  = require('multer')

const upload = multer({
  storage: cloudinaryHelper.storage
});

router.get('/list', categoryController.list);
router.get('/create', categoryController.create);
router.post('/create', upload.single('avatar'), categoryValidate.createPost,
categoryController.createPost);
router.get('/edit/:id', categoryController.edit)
router.patch('/edit/:id',upload.single('avatar'), categoryValidate.createPost, categoryController.editPatch)
router.patch('/delete/:id', categoryController.deletePatch)
router.patch('/change-multi',  categoryValidate.changeMultiPatch, categoryController.changeMultiPatch)
router.patch('/trash-multi', categoryController.trashMultiPatch);
router.get('/trash', categoryController.trash);
router.patch('/undo/:id', categoryController.undoPatch)
router.delete('/remove/:id', categoryController.remove)

module.exports = router;

