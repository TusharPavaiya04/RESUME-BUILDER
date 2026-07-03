import { verifyMail } from '../emailVerify/verifyMail.js';
import { sendOtpMail } from '../emailVerify/sendOtpMail.js';
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    console.log("register route hit");
    
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword 
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
        );

      console.log("User created");

newUser.token = token;
await newUser.save();

console.log("Before sending mail");

await verifyMail2(token, email);

console.log("After sending mail");

        const userResponse={
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            isVerified:newUser.isVerified
        }
        return res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email.",
            data: userResponse
        });

    } catch (err) {
        console.log("register error : ",err)
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const verification = async (req, res) => {
    try {
        const { token } = req.params; // ✅ params not body

        console.log("token:", token);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.token !== token) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token"
            });
        }

        if (user.isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email already verified"
            });
        }

        user.isVerified = true;
        user.token = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    if (!user.isVerified) {
        return res.status(403).json({
            success: false,
            message: "Please verify your email first"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "7d"
        }
    );
    user.isLoggedIn = true;
user.token = token;
await user.save();


    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        message: `Welcome back ${user.username}`,
        accessToken: token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
    });

} catch (err) {
    return res.status(500).json({
        success: false,
        message: err.message
    });

}
};

export const logoutUser = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email });

        // Don't reveal whether email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If an account exists, an OTP has been sent"
            });
        }

       const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
const hashedOtp = await bcrypt.hash(rawOtp, 10); // ← hash it

user.otp = hashedOtp;  // ← store hash
user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
await user.save();

await sendOtpMail(email, rawOtp); // ← send raw to user

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// POST /user/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Account already verified" });
    }

    // Check OTP expiry
    if (!user.otpExpiry || new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    // Compare OTP (hashed)
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark verified, clear OTP fields
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ success: true, message: "Account verified successfully. You can now login." });

  } catch (err) {
    console.log("verifyOtp ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// POST /user/resend-otp
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Account is already verified" });
    }

    // Generate new OTP
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const hashedOtp = await bcrypt.hash(rawOtp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = hashedOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via your email service (EmailJS / Nodemailer / Resend)
    // await sendOtpEmail(email, rawOtp);  ← plug in your email util here
    console.log(`[DEV] OTP for ${email}: ${rawOtp}`); // remove in production

    return res.status(200).json({ success: true, message: "OTP resent successfully. Check your email." });

  } catch (err) {
    console.log("resendOtp ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const changePassword = async (req, res) => {
    try {

        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.resetPasswordAllowed) {
            return res.status(403).json({
                success: false,
                message: "Verify OTP first"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        user.resetPasswordAllowed = false;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};



export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ← NO isVerified check here, these users are already verified

    if (!user.otpExpiry || new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Allow password reset
    user.resetPasswordAllowed = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified. You can now reset your password." });

  } catch (err) {
    console.log("verifyForgotPasswordOtp ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};