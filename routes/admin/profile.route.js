const router = require("express").Router();
const profileController = require("../../controllers/admin/profile.controller.js");

router.get('/', profileController.info);
router.get('/editPassword', profileController.editPassword);

module.exports = router;