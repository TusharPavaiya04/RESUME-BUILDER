import express from 'express';
import { createResume,getResumeById, deleteResume, getPublicResumeById, updateResume } from '../Controllers/resumeController.js';
import {protect} from '../middleware/authMiddleware.js';
import {upload} from '../configs/multer.js';

const resumeRouter=express.Router();


resumeRouter.post('/create',protect,createResume);
resumeRouter.put('/update',protect,upload.single('image'),updateResume);
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.get('/get/:resumeId',protect,getResumeById);
resumeRouter.get('/public/:resumeId',getPublicResumeById);


export default resumeRouter;