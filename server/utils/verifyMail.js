import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (email, verifyLink) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email — Resume Builder",
      html: `
        <div style="background:#f4f4f4; padding:40px 20px; font-family:Arial, sans-serif;">
          <div style="max-width:500px; margin:auto; background:white; padding:32px; 
                      border-radius:12px; text-align:center;">
            <h2 style="color:#0F172A;">Verify Your Email</h2>
            <p style="color:#64748B; font-size:14px;">
              Thanks for signing up! Click below to verify your email.
            </p>
            <a href="${verifyLink}"
               style="display:inline-block; margin-top:16px; padding:12px 32px; 
                      background:#2563EB; color:white; text-decoration:none; 
                      border-radius:8px; font-weight:bold;">
              Verify Email
            </a>
            <p style="color:#94A3B8; font-size:12px; margin-top:24px;">
              This link expires in <strong>24 hours</strong>.
            </p>
            <p style="color:#CBD5E1; font-size:11px; margin-top:8px;">
              If you didn't sign up, ignore this email.
            </p>
          </div>
        </div>
      `,
    });
    console.log("✅ Verification email sent to:", email);
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error("Verification email not sent");
  }
};