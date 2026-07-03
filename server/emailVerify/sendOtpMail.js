import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpMail = async (email, otp) => {
    try {

        const { data, error } = await resend.emails.send({
            from: process.env.MAIL_FROM || 'onboarding@resend.dev',
            to: email,
            subject: 'Password Reset OTP',
            html: `
            <div style="font-family: Arial, sans-serif; padding:20px;">
                
                <h2>Password Reset Request</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Use the OTP below to continue:
                </p>

                <div style="
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:5px;
                    color:#4CAF50;
                    margin:20px 0;
                ">
                    ${otp}
                </div>

                <p>
                    This OTP is valid for <b>10 minutes</b>.
                </p>

                <p>
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

                <hr>

                <small>
                    Please do not share this OTP with anyone.
                </small>

            </div>
            `
        });

        if (error) {
            console.log('Mail Error:', error.message);
            throw new Error(error.message || 'Failed to send OTP email');
        }

        console.log('OTP email sent successfully:', data?.id);

    } catch (error) {

        console.log('Mail Error:', error.message);
        throw error;
        
    }
};