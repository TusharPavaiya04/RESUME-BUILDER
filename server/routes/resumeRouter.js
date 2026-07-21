import express from 'express';
import { createResume, getResumeById, deleteResume, getPublicResumeById, updateResume, getAllResumes } from '../Controllers/resumeController.js';

resumeRouter.get('/', protect, getAllResumes);   // add this
resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);