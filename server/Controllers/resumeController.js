import { response } from "express";
import Resume from "../model/resume.js";
import imageKit from '../configs/imageKit.js'
import fs from 'fs';

// Controller for creating a new resume
// POST: /api/resumes/create

export const createResume=async(req,res)=>{
    try{
   const userId=req.userId;
   const {title}=req.body;
       

//    create new resumes
const newResume=await Resume.create({userId,title});

// return success message
return res.status(201).json({
    message:"Resume created successfully",
    resume:newResume
})

    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

// contoller for deleting a resume
// DELETE: /api/reumes/DELETE

export const deleteResume=async(req,res)=>{
    try{
   const userId=req.userId;
  const {resumeId}=req.params;       


await Resume.findOneAndDelete({userId,_id:resumeId});
  // return success message
return res.status(200).json({
    message:"Resume deleted successfully",
})
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}


// get user resume by id
// get: /api/resumes/get


export const getResumeById=async(req,res)=>{
    try{
   const userId=req.userId;
  const {resumeId}=req.params;       

const resume=await Resume.findOne({userId,_id:resumeId});
if(!resume){
    return res.status(404).json({
        message:"Resume not found"
    })
}

// return success message
resume._v=undefined;
resume.createdAt=undefined;
resume.updatedAt=undefined;
return res.status(200).json({resume});

    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}


// get resume by id public
// GET: /api/resumes/public

export const getPublicResumeById=async(req,res)=>{
try{
const {resumeId}=req.params;
const resume=await Resume.findOne({public:true,_id:resumeId});
if(!resume){
    return res.status(404).json({
        message:"Resume not found"
    }
)
}
return res.status(200).json({resume});
}catch(err){
return res.status(400).json({
        message:err.message
    })
}
}



// controller for updating a resume
// Put /api/resumes/updatedAt
// controller for updating a resume
// PUT /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.body;

    // ✅ Validate
    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    // ✅ Find existing resume (for fallback values)
    const existingResume = await Resume.findOne({
      _id: resumeId,
      userId,
    });

    if (!existingResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // ✅ Parse resumeData safely
    let resumeDataCopy = {};

    try {
      if (req.body.resumeData) {
        resumeDataCopy =
          typeof req.body.resumeData === "string"
            ? JSON.parse(req.body.resumeData)
            : req.body.resumeData;

        // 🔥 SAFE PARSING FUNCTION
        const safeParseArray = (field) => {
          try {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            if (typeof field === "string") return JSON.parse(field);
            return [];
          } catch {
            return [];
          }
        };

        // ✅ FIX ALL ARRAYS SAFELY
        resumeDataCopy.projects = safeParseArray(resumeDataCopy.projects);
        resumeDataCopy.experience = safeParseArray(resumeDataCopy.experience);
        resumeDataCopy.education = safeParseArray(resumeDataCopy.education);
        resumeDataCopy.skills = safeParseArray(resumeDataCopy.skills);
      } else {
        throw new Error("resumeData missing");
      }
    } catch (err) {
      return res.status(400).json({
        message: "Invalid resume data",
      });
    }

    // ✅ Ensure structure exists
    if (!resumeDataCopy.personal_info) {
      resumeDataCopy.personal_info = {};
    }

    // ✅ Ensure skills always exist
    if (!Array.isArray(resumeDataCopy.skills)) {
      resumeDataCopy.skills = [];
    }

    // ✅ FINAL UPDATE
   const resume = await Resume.findOneAndUpdate(
  { _id: resumeId, userId },
  {
    $set: {
      title: resumeDataCopy.title ?? existingResume.title,
      personal_info: resumeDataCopy.personal_info?.full_name
        ? resumeDataCopy.personal_info
        : existingResume.personal_info,
      professional_summary: resumeDataCopy.professional_summary ?? existingResume.professional_summary,
      experience: resumeDataCopy.experience?.length ? resumeDataCopy.experience : existingResume.experience,
      education: resumeDataCopy.education?.length ? resumeDataCopy.education : existingResume.education,
      projects: resumeDataCopy.projects?.length ? resumeDataCopy.projects : existingResume.projects,
      skills: resumeDataCopy.skills?.length ? resumeDataCopy.skills : existingResume.skills,
      template: resumeDataCopy.template ?? existingResume.template,
      accent_color: resumeDataCopy.accent_color ?? existingResume.accent_color,
      public: resumeDataCopy.public ?? existingResume.public,
    },
  },
  { returnDocument: "after" }
);

    return res.status(200).json({
      message: "Saved successfully",
      resume,
    });

  } catch (err) {
    console.error("Update Resume Error:", err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// get all resumes for logged-in user
// GET: /api/resumes/
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({ resumes });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
