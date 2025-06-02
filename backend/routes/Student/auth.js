const express = require('express');
const { signIn, forgotPassword, verifyOtp, resetPassword, saveSignIn, checkUserExists } = require('../../controllers/student/authController');
const router = express.Router();

router.post('/signin', signIn);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/save-signin', saveSignIn);
router.get('/check-user', checkUserExists);

module.exports = router;
