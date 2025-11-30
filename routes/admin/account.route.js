const router = require("express").Router();
const accountController = require("../../controllers/admin/account.controller.js");
router.get('/login', accountController.login);

// trang dki
router.get('/register', accountController.register);
// trang quên mk
router.get('/forgot-password', accountController.forgotPassword);

router.get('/reset-password', accountController.resetPassword);

router.get('/OTP', accountController.OTP);

module.exports = router;