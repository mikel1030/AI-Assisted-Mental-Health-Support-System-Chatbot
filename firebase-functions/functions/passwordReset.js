/**
 * Complete Password Reset Cloud Function
 * Handles both generating reset codes and sending emails
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

const auth = admin.auth();
const SENDER_EMAIL = process.env.EMAIL_USER || 'normatest.ai@gmail.com';
const RESET_URL_BASE = process.env.RESET_URL_BASE || 'https://kumusta-ai-app.web.app/reset-password';

// Configure email transporter - using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'normatest.ai@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'nvid rvtt apgf azgo' // Gmail App Password
  }
});

/**
 * HTTP Cloud Function to request password reset
 * POST /requestPasswordReset
 * Body: { email: "user@example.com" }
 */
exports.requestPasswordReset = functions.https.onCall(async (data, context) => {
  const { email } = data;

  try {
    // Validate email
    if (!email || !email.trim()) {
      throw new functions.https.HttpsError('invalid-argument', 'Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email address');
    }

    // Check if user exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email.trim());
    } catch (err) {
      // User not found - return success anyway (security: don't reveal if email exists)
      console.log(`Password reset requested for non-existent email: ${email}`);
      return {
        success: true,
        message: 'If this email exists, you will receive a password reset link'
      };
    }

    // Generate password reset link using Firebase Admin SDK
    const resetLink = await auth.generatePasswordResetLink(email.trim());

    // Create HTML email
    const htmlEmail = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
      .logo { text-align: center; margin-bottom: 32px; }
      .logo h1 { color: #27ae60; margin: 0; font-size: 28px; font-weight: 700; }
      .logo p { color: #666; margin: 6px 0 0 0; font-size: 14px; }
      .greeting { font-size: 16px; color: #333; margin-bottom: 20px; }
      .content { color: #555; line-height: 1.8; font-size: 15px; margin-bottom: 24px; }
      .button-container { text-align: center; margin: 32px 0; }
      .button { display: inline-block; background-color: #27ae60; color: white; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; border: none; cursor: pointer; }
      .button:hover { background-color: #1e8449; }
      .alt-link { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60; }
      .alt-link p { margin: 0 0 12px 0; font-weight: 600; color: #27ae60; }
      .alt-link code { background-color: #f0f0f0; padding: 10px; display: block; word-break: break-all; font-size: 12px; font-family: 'Courier New', monospace; color: #333; border-radius: 4px; margin-top: 8px; overflow-wrap: break-word; }
      .security-notice { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 24px 0; border-radius: 6px; font-size: 14px; }
      .security-notice strong { color: #856404; }
      .tips { margin: 24px 0; }
      .tips h3 { color: #27ae60; font-size: 15px; margin: 0 0 12px 0; }
      .tips ul { margin: 0; padding-left: 20px; }
      .tips li { margin: 8px 0; color: #555; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; }
      .footer a { color: #27ae60; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <h1>🌿 Kumusta AI</h1>
        <p>Your Personal Mental Health Companion</p>
      </div>
      
      <p class="greeting">Hello,</p>
      
      <p class="content">
        We received a request to reset the password for your Kumusta AI account. If you didn't make this request, you can safely ignore this email and your account will remain secure.
      </p>

      <div class="button-container">
        <a href="${resetLink}" class="button">🔐 Reset Your Password</a>
      </div>

      <p class="content">
        If the button above doesn't work, you can copy and paste this link in your browser:
      </p>

      <div class="alt-link">
        <p>📋 Password Reset Link:</p>
        <code>${resetLink}</code>
      </div>

      <div class="security-notice">
        <strong>⏰ Important:</strong> This link will expire in <strong>1 hour</strong> for security reasons. If it expires, you can request a new password reset from the login page.
      </div>

      <div class="tips">
        <h3>🔒 Security Tips:</h3>
        <ul>
          <li>✅ Never share this password reset link with anyone</li>
          <li>✅ Kumusta AI support will never ask for your password</li>
          <li>✅ Always verify you're on the official Kumusta AI website</li>
          <li>✅ Use a strong password with letters, numbers, and special characters</li>
        </ul>
      </div>

      <p class="content">
        Need help? Contact our support team at support@kumusta-ai.com
      </p>

      <p style="margin: 24px 0 0 0; color: #666;">
        Best regards,<br>
        <strong>The Kumusta AI Team</strong>
      </p>

      <div class="footer">
        <p>© 2024 Kumusta AI. All rights reserved.<br>
        This is an automated security email. Please do not reply directly.<br>
        <a href="https://kumusta-ai.web.app/privacy">Privacy Policy</a> | 
        <a href="https://kumusta-ai.web.app/terms">Terms of Service</a></p>
      </div>
    </div>
  </body>
</html>
    `;

    // Create plain text version
    const textEmail = `
KUMUSTA AI - PASSWORD RESET REQUEST

Hello,

We received a request to reset the password for your Kumusta AI account. If you didn't make this request, you can safely ignore this email.

RESET YOUR PASSWORD:

Click this link to reset your password:
${resetLink}

IMPORTANT: This link will expire in 1 hour.

SECURITY TIPS:
- Never share this password reset link with anyone
- Kumusta AI support will never ask for your password
- Always verify you're on the official Kumusta AI website
- Use a strong password with letters, numbers, and special characters

If you need help, contact support@kumusta-ai.com

Best regards,
The Kumusta AI Team

© 2024 Kumusta AI. All rights reserved.
    `;

    // Send email
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email.trim(),
      subject: '🔐 Reset Your Kumusta AI Password',
      text: textEmail,
      html: htmlEmail,
      replyTo: 'support@kumusta-ai.com'
    });

    console.log('Password reset email sent successfully to:', email);

    return {
      success: true,
      message: 'Password reset link sent to your email'
    };

  } catch (error) {
    console.error('Error in requestPasswordReset:', {
      message: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });

    // Return generic error message
    if (error.code === 'invalid-argument') {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      'Failed to send password reset email. Please try again later.'
    );
  }
});

/**
 * HTTP Cloud Function to verify reset token and reset password
 * POST /resetPassword
 * Body: { oobCode: "...", newPassword: "..." }
 */
exports.resetPassword = functions.https.onCall(async (data, context) => {
  const { oobCode, newPassword } = data;

  try {
    // Validate inputs
    if (!oobCode || !newPassword) {
      throw new functions.https.HttpsError('invalid-argument', 'Reset code and password are required');
    }

    if (newPassword.length < 6) {
      throw new functions.https.HttpsError('invalid-argument', 'Password must be at least 6 characters');
    }

    // Reset password using Firebase Admin SDK
    const email = await auth.verifyPasswordResetCode(oobCode);
    await auth.confirmPasswordReset(oobCode, newPassword);

    console.log('Password reset successfully for:', email);

    return {
      success: true,
      message: 'Password reset successful. You can now log in with your new password.'
    };

  } catch (error) {
    console.error('Error in resetPassword:', {
      message: error.message,
      code: error.code
    });

    if (error.code === 'auth/invalid-action-code') {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid or expired reset code');
    }
    if (error.code === 'auth/expired-action-code') {
      throw new functions.https.HttpsError('invalid-argument', 'This reset link has expired. Please request a new one.');
    }
    if (error.code === 'auth/weak-password') {
      throw new functions.https.HttpsError('invalid-argument', 'Password is too weak. Use letters, numbers, and special characters.');
    }

    throw new functions.https.HttpsError('internal', 'Failed to reset password. Please try again.');
  }
});
