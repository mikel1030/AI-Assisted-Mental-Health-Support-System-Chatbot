/**
 * Cloud Function to send password reset emails
 * 
 * Triggered by: Frontend when user requests password reset
 * Returns: Email confirmation or error
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure email transporter using Gmail SMTP or SendGrid
// For Gmail: Use an App Password (2FA required)
// For SendGrid: Use SENDGRID_API_KEY environment variable

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

const SENDER_EMAIL = process.env.EMAIL_USER || 'noreply@kumusta-ai.com';
const RESET_URL_BASE = process.env.RESET_URL_BASE || 'https://kumusta-ai-app.web.app/reset-password';
const FIREBASE_PROJECT = 'kumusta-ai';

/**
 * Cloud Function: Send Password Reset Email
 * 
 * Callable from frontend: sendPasswordResetEmail(auth, email) triggers this
 */
exports.sendPasswordResetEmail = functions.https.onRequest(async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const { email, resetCode } = req.body;

    // Validate inputs
    if (!email || !resetCode) {
      return res.status(400).json({
        error: 'Email and reset code are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Build reset link with code
    const resetLink = `${RESET_URL_BASE}?oobCode=${resetCode}&mode=resetPassword`;

    // Create HTML email template
    const htmlEmail = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .logo { text-align: center; margin-bottom: 30px; }
      .logo h1 { color: #27ae60; margin: 0; font-size: 28px; }
      .logo p { color: #666; margin: 8px 0 0 0; font-size: 14px; }
      .content { color: #333; line-height: 1.8; font-size: 16px; }
      .button { display: inline-block; background-color: #27ae60; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 24px 0; font-size: 16px; }
      .link-box { background-color: #f9f9f9; padding: 16px; border-left: 4px solid #27ae60; margin: 20px 0; border-radius: 4px; }
      .link-box code { background-color: #f0f0f0; padding: 8px 12px; border-radius: 4px; word-break: break-all; font-size: 13px; font-family: 'Courier New', monospace; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
      .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-size: 14px; }
      ul { margin: 12px 0; padding-left: 24px; }
      li { margin: 8px 0; }
      strong { color: #27ae60; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <h1>🌿 Kumusta AI</h1>
        <p>Your Personal Mental Health Companion</p>
      </div>
      
      <div class="content">
        <p>Hello,</p>
        
        <p>We received a request to reset the password for your Kumusta AI account. If you didn't make this request, you can safely ignore this email.</p>
        
        <h2 style="color: #27ae60; font-size: 18px; margin-top: 24px;">Reset Your Password</h2>
        
        <p>Click the button below to set a new password:</p>
        
        <div style="text-align: center;">
          <a href="${resetLink}" class="button">Reset Your Password</a>
        </div>
        
        <p><strong>Or copy and paste this link in your browser:</strong></p>
        
        <div class="link-box">
          <code>${resetLink}</code>
        </div>
        
        <div class="warning">
          <strong>⏰ Security Notice:</strong> This link will expire in 1 hour. If it expires, you can request a new password reset from the login page.
        </div>
        
        <h3 style="color: #333; font-size: 16px; margin-top: 24px;">Security Tips:</h3>
        <ul>
          <li>✅ Never share this password reset link with anyone</li>
          <li>✅ Kumusta AI support will never ask for your password</li>
          <li>✅ Always verify you're on the official Kumusta AI website</li>
          <li>✅ Use a strong password with letters, numbers, and symbols</li>
        </ul>
        
        <p style="margin-top: 24px;">If you need help, contact our support team or reply to this email.</p>
        
        <p style="margin-top: 24px;">Best regards,<br><strong>The Kumusta AI Team</strong></p>
      </div>
      
      <div class="footer">
        <p>© 2024 Kumusta AI. All rights reserved.<br>
        This is an automated message. Please do not reply to this email.<br>
        <a href="https://kumusta-ai.com/privacy" style="color: #27ae60; text-decoration: none;">Privacy Policy</a> | 
        <a href="https://kumusta-ai.com/terms" style="color: #27ae60; text-decoration: none;">Terms of Service</a></p>
      </div>
    </div>
  </body>
</html>
    `.trim();

    // Create plain text version
    const textEmail = `
Kumusta AI - Password Reset

Hello,

We received a request to reset the password for your Kumusta AI account. If you didn't make this request, you can safely ignore this email.

RESET YOUR PASSWORD:

Click this link to set a new password:
${resetLink}

SECURITY NOTICE:
This link will expire in 1 hour. If it expires, request a new password reset from the login page.

SECURITY TIPS:
- Never share this password reset link with anyone
- Kumusta AI support will never ask for your password
- Always verify you're on the official Kumusta AI website
- Use a strong password with letters, numbers, and symbols

If you need help, contact our support team.

Best regards,
The Kumusta AI Team

© 2024 Kumusta AI. All rights reserved.
    `.trim();

    // Send email via Nodemailer/Gmail
    const mailOptions = {
      from: SENDER_EMAIL,
      to: email,
      subject: 'Reset Your Kumusta AI Password',
      text: textEmail,
      html: htmlEmail,
      replyTo: 'support@kumusta-ai.com'
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      email: email,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending password reset email:', {
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });

    // Don't expose internal error details to client
    const statusCode = error.statusCode || 500;
    const message = 'Failed to send password reset email. Please try again later.';

    return res.status(statusCode).json({
      error: message
    });
  }
});

/**
 * Alternative: Trigger on user password reset request (for future enhancement)
 */
exports.onAuthPasswordResetRequested = functions.auth.user().onCreate(async (user) => {
  // This could be extended to handle auto password reset emails
  console.log('New user created:', user.uid);
  return null;
});
