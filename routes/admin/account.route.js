const router = require("express").Router();
const accountController = require("../../controllers/admin/account.controller.js");
const accountValidate = require("../../validates/admin/account.validate");
const authenMiddle = require("../../middlewares/admin/auth.middleware.js")

// Trang đăng nhập
router.get('/login', accountController.login);
router.post('/login',accountValidate.loginPost, accountController.loginPost);

// trang đăng xuất
router.get('/log-out', accountController.logOut);





// trang dki
router.get('/register', accountController.register);
router.post('/register', accountValidate.registerPost, accountController.registerPost)
router.get('/register-initial', accountController.registerInitial);



// trang quên mk
router.get('/forgot-password', accountController.forgotPassword);
router.post('/forgot-password',accountValidate.forgotPasswordPost, accountController.forgotPasswordPost);


router.get('/OTP', accountController.OTP);
router.post('/OTP',accountValidate.OtpPassWordPost, accountController.OtpPassWordPost);


router.get('/reset-password', accountController.resetPassword);

router.post('/reset-password',
  authenMiddle.verifyToken, 
  accountValidate.resetPasswordPost,
  accountController.resetPasswordPost
);

module.exports = router;