import admin from './firebase.js';

export const sendVerificationMail = async (email, password) => {
  // Create user in Firebase Auth (it will send the verification email)
  const userRecord = await admin.auth().createUser({
    email,
    password,
    emailVerified: false,
  });

  // Generate email verification link
  const verifyLink = await admin.auth().generateEmailVerificationLink(email, {
    url: `${process.env.FRONTEND_URL}/verify-email-success`, // redirect after verification
  });

  return { userRecord, verifyLink };
};