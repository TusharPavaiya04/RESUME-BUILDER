import nodemailer from "nodemailer";

const sendOtpMail = async (email, otp) => {
  try {
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial; text-align:center;">
          <h2>Password Reset</h2>
          <p>Your OTP is:</p>
          <h1 style="color:green;">${otp}</h1>
          <p>This OTP is valid for 10 minutes</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP email sent");

  } catch (error) {
    console.log("Error sending mail:", error.message);
    throw new Error("Email not sent");
  }
};

export default sendOtpMail;