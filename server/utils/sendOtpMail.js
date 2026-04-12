import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });
    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error("Email not sent");
  }
};