const router = require("express").Router();
const accountController = require("../../controllers/admin/account.controller.js");
const accountValidate = require("../../validates/admin/account.validate");



router.get('/login', accountController.login);

// trang dki
router.get('/register', accountController.register);
router.post('/register', accountValidate.registerPost, accountController.registerPost)
router.get('/register-initial', accountController.registerInitial);


// trang quên mk
router.get('/forgot-password', accountController.forgotPassword);

router.get('/reset-password', accountController.resetPassword);

router.get('/OTP', accountController.OTP);

module.exports = router;