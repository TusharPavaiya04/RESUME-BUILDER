import express from 'express';
import { verifyEmail, getUserById, getUserResumes,loginUser, registerUser,verifyOTP, forgotPassword,resetPassword } from '../Controllers/userControllers.js';
import {protect} from '../middleware/authMiddleware.js';
const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.get('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes);
userRouter.post('/forgot-password',forgotPassword);
userRouter.post('/verify-otp',verifyOTP);
userRouter.post("/reset-password", resetPassword);
userRouter.get('/verify-email', verifyEmail);

userRouter.post('/login', loginUser);

export default userRouter;
