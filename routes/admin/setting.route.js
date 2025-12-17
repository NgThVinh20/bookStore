const router = require("express").Router();
const cloudinaryHelper = require("../../helpers/cloudinary.helper.js");
const multer  = require('multer')
const upload = multer({
  storage: cloudinaryHelper.storage
});
const accountValidate = require("../../validates/admin/account.validate");
const settingController = require("../../controllers/admin/setting.controller.js");

router.get('/list', settingController.list);
router.get('/info', settingController.info);
router.patch('/info',upload.fields([{
  name: 'logo', maxCount: 1
  },
  {
  name: 'favicon', maxCount: 1
  }
]), settingController.infoPatch);

router.get('/adminAccount', settingController.accountAdminList);
router.get('/adminCreate', settingController.adminCreate);
router.post('/adminCreate',upload.single('avatar'), settingController.adminCreatePost);
router.get('/editAccountAdmin/:id', settingController.adminEdit)
router.patch(
  '/editAccountAdmin/:id', 
  upload.single("avatar"),
  settingController.accountAdminEditPatch
)
router.delete('/removeAccount/:id', settingController.removeAccount)
router.patch('/change-multi',  accountValidate.changeMultiPatch, settingController.changeMultiPatch)

router.get('/roleAdmin', settingController.roleAdmin);
router.get('/createRole', settingController.createRole);
router.post('/createRole', settingController.createRolePost);
router.get('/roleEdit/:id', settingController.roleEdit);
router.patch('/roleEdit/:id', settingController.roleEditPatch);
router.delete('/roleDelete/:id', settingController.remove);
router.patch('/trash-multi', settingController.trashMultiPatchRole);

module.exports = router;