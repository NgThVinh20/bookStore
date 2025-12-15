const router = require("express").Router();
const cloudinaryHelper = require("../../helpers/cloudinary.helper.js");
const multer  = require('multer')
const upload = multer({
  storage: cloudinaryHelper.storage
});

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

router.get('/adminAccount', settingController.adminAccount);
router.get('/adminCreate', settingController.adminCreate);
router.get('/roleAdmin', settingController.roleAdmin);
router.get('/createRole', settingController.createRole);
router.post('/createRole', settingController.createRolePost);
router.get('/roleEdit/:id', settingController.roleEdit);
router.patch('/roleEdit/:id', settingController.roleEditPatch);
module.exports = router;