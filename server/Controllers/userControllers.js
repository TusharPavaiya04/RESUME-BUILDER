import User from '../model/userModel.js';
import Resume from '../model/resume.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOtpMail } from '../utils/sendOtpMail.js';
import admin from '../utils/firebase.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST: /api/user/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isEmailVerified)
      return res.status(400).json({ message: "User already exists" });

    // Check if already in Firebase, delete and recreate if unverified
    try {
      const firebaseUser = await admin.auth().getUserByEmail(email);
      if (!firebaseUser.emailVerified) {
        await admin.auth().deleteUser(firebaseUser.uid);
      }
    } catch (_) {
      // user doesn't exist in Firebase yet — that's fine
    }

    // Create user in Firebase Auth
    await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    // Generate Firebase email verification link
    const verifyLink = await admin.auth().generateEmailVerificationLink(email, {
      url: `${process.env.FRONTEND_URL}/login?verified=true`,
    });

    // Save to MongoDB as unverified
    if (!existingUser) {
      await User.create({ name, email, password, isEmailVerified: false });
    }

    // Send email using Firebase's built-in transport via nodemailer fallback
    // Since Render blocks nodemailer, use Firebase Trigger Email extension
    // OR return verifyLink to frontend and let Firebase Client SDK handle it
    // Best approach: return verifyLink and send via your own logic or Firebase extension

    // For now, return the link in response (see frontend step below)
    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
      email,
      verifyLink, // ⚠️ Only for testing — remove in production
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: /api/user/verify-email (called after Firebase redirects back)
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check Firebase if email is verified
    const firebaseUser = await admin.auth().getUserByEmail(email);

    if (!firebaseUser.emailVerified)
      return res.status(400).json({ message: "Email not verified yet" });

    // Mark verified in MongoDB
    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );

    if (!user)
      return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ success: true, message: "Email verified!" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST: /api/user/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check Firebase for email verification status
    const firebaseUser = await admin.auth().getUserByEmail(email);
    if (!firebaseUser.emailVerified) {
      return res.status(403).json({
        message: "Please verify your email first.",
        isVerified: false,
        email,
      });
    }

    // Sync MongoDB if not yet marked
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successful", token, user });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: /api/user/data
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: /api/user/resumes
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST: /api/user/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (user.otpExpiry && user.otpExpiry > Date.now())
      return res.status(400).json({ message: "OTP already sent. Please wait." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendOtpMail(email, otp);

    return res.status(200).json({ success: true, message: "OTP sent to email" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// POST: /api/user/verify-otp
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp)
      return res.status(400).json({ message: "Invalid request" });

    if (user.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid OTP" });

    user.isOtpVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// POST: /api/user/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    if (!user.isOtpVerified)
      return res.status(400).json({ message: "OTP not verified" });

    user.password = password;
    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};