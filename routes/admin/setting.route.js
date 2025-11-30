const router = require("express").Router();
const settingController = require("../../controllers/admin/setting.controller.js");

router.get('/list', settingController.list);
router.get('/info', settingController.info);
router.get('/adminAccount', settingController.adminAccount);
router.get('/adminCreate', settingController.adminCreate);
router.get('/roleAdmin', settingController.roleAdmin);
router.get('/createRole', settingController.createRole);
module.exports = router;