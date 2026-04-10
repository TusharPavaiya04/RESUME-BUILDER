import express from 'express';
import {  getUserById, getUserResumes, loginUser, registerUser,verifyOTP, forgotPassword,resetPassword } from '../Controllers/userControllers.js';
import {protect} from '../middleware/authMiddleware.js';
const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResumes);
userRouter.post('/forgot-password',forgotPassword);
userRouter.post('/verify-otp',verifyOTP);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
