import User from '../model/userModel.js';
import Resume from '../model/resume.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {sendOtpMail} from '../utils/sendOtpMail.js'

const generateToken=(userId)=>{
    const token=jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    )
    return token;
}

// controller for user registration
// POST: /api/user/register
export const registerUser=async(req,res)=>{
try{
const {name,email,password}=req.body;

if(!name||!email||!password){
    return res.status(400).json({
        message:"Missing required fields"
    })
}

// check if user already exists

const user=await User.findOne({email});
if(user){
    return  res.status(400).json({
        message:"User already exists"
    })
}

// create new user

const hashedPassword=await bcrypt.hash(password,10);
const newUser=await User.create({
    name,email,password:hashedPassword
}
)

// return success message
const token=generateToken(newUser._id);
newUser.password=undefined;

return res.status(201).json({
    message:"User created successfully",
    token,
    user:newUser
})

}catch(err){
return res.status(400).json({
    message:err.message
})
}
}


// controllerll for user login
// POST://api/user/login

export const loginUser=async(req,res)=>{
try{
const {email,password}=req.body;

// check if user already exists

const user=await User.findOne({email});
if(!user){
    return  res.status(400).json({
        message:"Invalid email or password"
    })
}

// Verify password

// ✅ Fix
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({
    message: "Invalid email or password"
  });
}

// return success message
const token=generateToken(user._id);
user.password=undefined;

return res.status(200).json({
    message:"Login successfully",
    token,
    user
})

}catch(err){
return res.status(400).json({
    message:err.message
})
}
}


// controller for getting user by _id
// GET: /api/users/data


export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-password');

    return res.status(200).json({
      user   // ✅ MUST BE "user"
    });

  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
};
// controller for getting user resumes
// GET: /api/users/resumes

export const getUserResumes=async(req,res)=>{
    try{
        const userId=req.userId;

        // return user resumes
        const resumes=await Resume.find({userId});
        return res.status(200).json({resumes})
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🚨 prevent multiple OTP spam
    if (user.otpExpiry && user.otpExpiry > Date.now()) {
      return res.status(400).json({
        message: "OTP already sent. Please wait",
      });
    }

    // 🔢 generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔐 hash OTP using bcrypt
    const hashedOtp = await bcrypt.hash(otp, 10);

    // ✅ SAVE BEFORE sending email
    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    user.isOtpVerified = false;

    await user.save();

    console.log("Saved OTP:", otp);

    // 📧 send email via :contentReference[oaicite:0]{index=0}
    await sendOtpMail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOTP= async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.otp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // ⏱️ check expiry
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 🔐 compare OTP
    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ mark verified
    user.isOtpVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/authController.js
// controllers/authController.js


export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Check OTP verified
    if (!user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified",
      });
    }

    // 4. Update password (auto hashed via pre-save)
    user.password = password;

    // 5. Clear OTP data
    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};