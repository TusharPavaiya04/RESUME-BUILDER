import express from 'express';
import { registerUser, verification,resendOtp,loginUser ,logoutUser, forgotPassword, verifyOtp,verifyForgotPasswordOtp,changePassword} from '../Controllers/userControllers.js';
import { verifyMail } from '../emailVerify/verifyMail.js';
const router=express.Router();

router.post('/register',registerUser);
router.post('/verify/:token',verification);

router.post('/logout',logoutUser);
router.post('/login',loginUser);
router.post('/forgot-password',forgotPassword);
router.post('/changePassword',changePassword);
router.post('/verify-mail',verifyMail);

router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/verify-forgot-otp", verifyForgotPasswordOtp);
export default router;