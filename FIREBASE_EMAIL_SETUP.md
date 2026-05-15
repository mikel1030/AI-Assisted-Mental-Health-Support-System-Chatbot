# Firebase Password Reset Email Setup Guide

## Overview
This guide will help you configure Firebase to send real password reset emails to users. Firebase provides built-in email templates that are customizable and don't require additional email services.

## Prerequisites
- Your Firebase project is already created at [Firebase Console](https://console.firebase.google.com)
- You have admin access to your Firebase project
- Your project: **kumusta-ai** (ProjectID: kumusta-ai)

## Step 1: Enable Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **kumusta-ai**
3. In the left sidebar, go to **Build** → **Authentication**
4. Click on the **Sign-in method** tab
5. Click on **Email/Password** provider
6. Toggle the switch to **Enable** both:
   - ☑️ Email/Password
   - ☑️ Email link (passwordless sign-in) - optional but recommended
7. Click **Save**

✅ Email/Password authentication is now enabled!

---

## Step 2: Configure Email Templates (IMPORTANT!)

This is where you set up the actual password reset emails that users will receive.

### 2.1 Access Email Templates
1. In **Firebase Console** → **Authentication** → **Templates** tab (or scroll down)
2. Look for these three email templates:
   - Password reset
   - Email verification
   - Email change confirmation

### 2.2 Configure Password Reset Email Template

1. Click on the **Password reset** template
2. You'll see a form with these fields:

#### Sender Name
```
Kumusta AI Support
```

#### Sender Email
```
noreply@kumusta-ai.firebaseapp.com
```
*(This is the default Firebase email address - it will be replaced by your custom domain if you add one later)*

#### Subject
```
Reset Your Kumusta AI Password
```

#### Email Body (HTML)
Replace the default template with:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
      .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .logo { text-align: center; margin-bottom: 20px; }
      .logo h1 { color: #27ae60; margin: 0; }
      .content { color: #333; line-height: 1.6; }
      .button { display: inline-block; background-color: #27ae60; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; font-weight: bold; margin: 20px 0; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
      .warning { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 15px 0; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <h1>🌿 Kumusta AI</h1>
        <p style="color: #666; margin-top: 5px;">Your Personal Mental Health Companion</p>
      </div>
      
      <div class="content">
        <p>Hello,</p>
        
        <p>We received a request to reset your password for your Kumusta AI account. If you didn't make this request, you can safely ignore this email.</p>
        
        <p><strong>To reset your password, click the button below:</strong></p>
        
        <div style="text-align: center;">
          <a href="%LINK%" class="button">Reset Your Password</a>
        </div>
        
        <p><strong>Or copy and paste this link in your browser:</strong><br>
        <code style="background-color: #f5f5f5; padding: 10px; display: block; margin: 10px 0; word-break: break-all; border-radius: 4px;">%LINK%</code></p>
        
        <div class="warning">
          <strong>⏰ This link expires in 1 hour</strong><br>
          For security, this reset link is only valid for 1 hour. If it expires, you can request a new one.
        </div>
        
        <p><strong>Security Tips:</strong></p>
        <ul>
          <li>Never share your password reset link with anyone</li>
          <li>Kumusta AI support will never ask for your password</li>
          <li>Always verify you're on kumusta-ai.com before entering your password</li>
        </ul>
        
        <p>If you need any help, please contact our support team.</p>
        
        <p>Best regards,<br>The Kumusta AI Team</p>
      </div>
      
      <div class="footer">
        <p>© 2024 Kumusta AI. All rights reserved.<br>
        This is an automated message, please do not reply to this email.</p>
      </div>
    </div>
  </body>
</html>
```

**Important Variables:**
- `%LINK%` - Firebase automatically replaces this with the actual password reset link
- The link will include a parameter `?oobCode=...&mode=resetPassword` which your app handles

3. Click **Save**

✅ Password reset email template is configured!

---

## Step 3: Verify Firebase Configuration

Check your `firebase.js` file to ensure it has all required imports:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZWbU-pAyYWnLt6QkLlLIn1_NBToiAgH0",
  authDomain: "kumusta-ai.firebaseapp.com",
  projectId: "kumusta-ai",
  storageBucket: "kumusta-ai.firebasestorage.app",
  messagingSenderId: "340360829336",
  appId: "1:340360829336:web:e48f1729203d11d44a33ed"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

✅ Firebase configuration is complete!

---

## Step 4: Setup Your Custom Domain (Optional but Recommended)

To send emails from your own domain instead of `noreply@kumusta-ai.firebaseapp.com`:

1. In **Firebase Console** → **Settings** ⚙️
2. Go to **General** tab
3. Scroll to **Email Customization** section
4. Click **Setup your custom domain**
5. Follow Firebase's instructions to add DNS records
6. Verify your domain

⚠️ **For now, emails will be sent from `noreply@kumusta-ai.firebaseapp.com`**, which is fine for testing. Add your custom domain later when deploying to production.

---

## Step 5: Test the Password Reset Flow

### 5.1 Manual Testing

1. Go to your app's login page
2. Click **"Forgot Password?"**
3. Enter an email address
4. Click **"Send Reset Link"**
5. Check your email inbox for the reset email
6. Click the reset link in the email
7. You should be redirected to `/reset-password` page
8. Enter your new password and confirm
9. You should see a success message

### 5.2 Testing with Test Accounts

Use Firebase's test email accounts (no verification needed):
- Go to **Firebase Console** → **Authentication** → **Users** tab
- Click **Add User** to create test accounts
- Use these accounts to test password reset

### 5.3 Check Spam Folder

- Firebase emails sometimes go to Spam
- Add `noreply@kumusta-ai.firebaseapp.com` to your email's contacts/safe senders

---

## How It Works: Password Reset Flow

```
User enters email
        ↓
App calls sendPasswordResetEmail(auth, email)
        ↓
Firebase sends email with reset link
        ↓
User receives email and clicks link
        ↓
Link contains: ?oobCode=XXXXX&mode=resetPassword
        ↓
App redirects to /reset-password
        ↓
ResetPassword.jsx extracts oobCode from URL
        ↓
Verifies code with verifyPasswordResetCode()
        ↓
User enters new password
        ↓
App calls confirmPasswordReset(auth, code, newPassword)
        ↓
Firebase updates password ✅
```

---

## Troubleshooting

### Issue: "No email received after clicking send"
**Solutions:**
1. Check Firebase Console → Authentication → Email Customization
2. Wait 1-2 minutes (Firebase throttles requests)
3. Check SPAM folder
4. Verify email format is correct
5. Check browser console for errors (F12)

### Issue: "Link doesn't work or says 'Invalid code'"
**Solutions:**
1. Make sure `handleCodeInApp: false` in sendPasswordResetEmail options
2. Verify `/reset-password` route exists in your app
3. Check that ResetPassword.jsx is properly imported in App.jsx
4. Make sure the URL contains the `oobCode` parameter

### Issue: "Password reset works but emails not being sent"
**Solutions:**
1. Check that Email/Password auth is ENABLED in Firebase Console
2. Verify email template is saved
3. Clear browser cache and try again
4. Try with a different email address

### Issue: "Firebase errors like 'auth/user-not-found'"
**Solutions:**
- This is expected when email doesn't have an account
- Your app should show a user-friendly error message
- The ForgotPassword component already handles this ✅

---

## Email Best Practices

✅ **Do:**
- Use HTTPS (your app should be on HTTPS)
- Keep reset links short-lived (1 hour is good)
- Include clear instructions in emails
- Add security warnings about sharing links
- Test emails before going to production

❌ **Don't:**
- Send passwords in emails (security risk!)
- Use reset links that never expire
- Forget to verify user emails in your app
- Use unencrypted connections

---

## Production Checklist

Before launching to production:

- [ ] Set up custom domain for emails
- [ ] Test password reset flow thoroughly
- [ ] Check spam folder handling in documentation
- [ ] Add email to FAQ/Help section
- [ ] Set up email rate limiting (Firebase limits: ~10 reset emails per day per user)
- [ ] Monitor Firebase Authentication metrics
- [ ] Have backup reset mechanism if needed

---

## Advanced: Rate Limiting

Firebase automatically implements rate limiting:
- **Max 10 password reset emails per user per day**
- Prevents abuse and spam
- Error code: `auth/too-many-requests` (handled in your app)

---

## Support & Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Email Templates Guide](https://firebase.google.com/docs/auth/custom-email-handler)
- [Password Reset Security](https://firebase.google.com/docs/auth/custom-email-handler#reset_password)

---

## Summary

✅ Email authentication is configured!
✅ Password reset emails will be sent by Firebase
✅ Users can reset passwords by clicking email links
✅ Your app handles the redirect and confirmation

Your forgot password feature is now ready to use! 🎉
