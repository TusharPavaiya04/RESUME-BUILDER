import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyMail = async (token, email) => {

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: process.env.MAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Verify Your Email',
       html: `
<div style="font-family:Arial;padding:20px">
    <h2>Email Verification</h2>
    <p>Thank you for registering. Click the button below to verify your email.</p>
   <a href="${verificationLink}" style="
    display:inline-block;
    padding:12px 20px;
    background:#4CAF50;
    color:white;
    text-decoration:none;
    border-radius:5px;
  ">
  Verify Email
</a>
    <p style="margin-top:20px">Or open this link:</p>
    <p>${verificationLink}</p>
</div>
`
    });

   if (error) {
    console.log('Resend error:', error);
    throw new Error(error.message || 'Failed to send verification email');
}

    console.log('Verification email sent:', data?.id);
};