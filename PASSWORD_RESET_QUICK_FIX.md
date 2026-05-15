# PASSWORD RESET EMAIL - QUICK FIX SUMMARY

## Problem
Password reset emails weren't being sent. Firebase's built-in email system wasn't working properly.

## Solution Implemented ✅
Created a **Cloud Function-based system** that:
- Generates official Firebase password reset codes
- Sends beautifully formatted HTML emails via Gmail SMTP
- Is more reliable and easier to configure

---

## What Changed

### 1. New Cloud Function (firebase-functions/functions/passwordReset.js)
- `requestPasswordReset()` - Generates reset code and sends email
- `resetPassword()` - Confirms password reset after user submits new password

### 2. Updated Frontend Pages
- **ForgotPassword.jsx** - Now calls Cloud Function instead of Firebase built-in
- **ResetPassword.jsx** - Now calls Cloud Function for confirmation

### 3. Added Dependency
- `nodemailer` package for Gmail SMTP (added to package.json)

---

## To Make It Work (3 Simple Steps)

### Step 1: Get Gmail App Password ⏱️ ~2 minutes

1. Go to: https://myaccount.google.com/security
2. Make sure 2-Factor Authentication is ON (enable if not)
3. Scroll down to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Google gives you a **16-character password** - **COPY IT**

### Step 2: Deploy Cloud Functions ⏱️ ~3 minutes

Open PowerShell and run:

```powershell
cd "c:\Users\NORMA\OneDrive\Documents\CS ELECTIVE CHATBOT FILES\firebase-functions\functions"

# Install dependencies
npm install

# Set email credentials (replace with YOUR values)
$env:EMAIL_USER = "your-gmail@gmail.com"
$env:EMAIL_PASSWORD = "your-16-char-password"
$env:RESET_URL_BASE = "https://kumusta-ai-app.web.app/reset-password"

# Deploy
firebase deploy --only functions
```

### Step 3: Test It ⏱️ ~2 minutes

1. Start your app: `npm run dev`
2. Go to login page → Click "Forgot Password"
3. Enter a test email
4. **Check your Gmail inbox** (and Spam folder)
5. Click the reset link
6. Enter new password
7. Login with new password ✅

---

## Example Gmail Setup

If your Gmail is `normatest.ai@gmail.com`:
- Set `EMAIL_USER=normatest.ai@gmail.com`
- Use the 16-char password Google gave you

---

## What the User Experiences

1. **Clicks "Forgot Password"** → Enters email
2. **Receives email** with subject: "🔐 Reset Your Kumusta AI Password"
3. **Clicks "Reset Your Password"** button in email
4. **Enters new password** → Confirms
5. **Logs in** with new password

---

## Email Features

✅ Beautiful HTML design
✅ Mobile-friendly
✅ Clear instructions
✅ Security tips included
✅ Fallback link if button doesn't work
✅ 1-hour expiration warning

---

## If Something Doesn't Work

### Emails not arriving?
- Check Spam folder in Gmail
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Check Firebase Console → Cloud Functions → Logs for errors

### Invalid reset code?
- Link might have expired (1 hour limit)
- Email address might not exist in Firebase
- Try requesting a new reset

### Deployment error?
- Make sure you ran `npm install` first
- Make sure Firebase CLI is installed
- Make sure you're in the correct directory

---

## Files Changed

- ✅ `firebase-functions/functions/passwordReset.js` (NEW)
- ✅ `firebase-functions/functions/index.js` (Updated)
- ✅ `firebase-functions/functions/package.json` (Updated)
- ✅ `src/pages/ForgotPassword.jsx` (Updated)
- ✅ `src/pages/ResetPassword.jsx` (Updated)

---

## Next (Optional)

After it's working, you could:
- Set up Gmail forwarding to your work email
- Customize email template (in passwordReset.js)
- Switch to SendGrid/Mailgun if you prefer (just update nodemailer config)

---

**That's it! The system is ready to go once you deploy the Cloud Functions.** 🚀
