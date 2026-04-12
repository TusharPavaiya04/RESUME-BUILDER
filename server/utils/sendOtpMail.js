import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpMail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM, // e.g. onboarding@resend.dev
      to: email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    console.log("✅ Email sent");
  } catch (error) {
    console.error("❌ Resend Error:", error);
    throw new Error("Email not sent");
  }
};