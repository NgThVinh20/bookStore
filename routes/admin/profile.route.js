const router = require("express").Router();
const cloudinaryHelper = require("../../helpers/cloudinary.helper.js");
const multer  = require('multer')
const upload = multer({
  storage: cloudinaryHelper.storage
});

const profileController = require("../../controllers/admin/profile.controller.js");

router.get('/edit', profileController.info);
router.patch('/edit',upload.single('avatar'), profileController.editPatch);
router.get('/editPassword', profileController.editPassword);
router.patch('/editPassword',upload.none(), profileController.editPasswordPatch);
// 
module.exports = router;