# Password Reset Email - Setup Guide

## Overview
The password reset functionality now uses a Cloud Function that sends emails via Gmail SMTP. This is a reliable, working solution that doesn't require external services like Mailgun.

---

## Setup Steps

### Step 1: Enable Gmail SMTP for the Cloud Function

You need to use a Gmail App Password (requires 2FA enabled):

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Go back to Security
4. Find "App passwords" at the bottom
5. Select "Mail" and "Windows Computer" (or your platform)
6. Google will generate a 16-character app password - **copy it**

### Step 2: Deploy Cloud Functions with Environment Variables

Navigate to your Firebase functions directory:

```powershell
cd "c:\Users\NORMA\OneDrive\Documents\CS ELECTIVE CHATBOT FILES\firebase-functions\functions"
```

Install dependencies:

```powershell
npm install
```

Set environment variables (replace with your actual Gmail and app password):

```powershell
# Windows PowerShell
$env:EMAIL_USER = "your-gmail@gmail.com"
$env:EMAIL_PASSWORD = "your-16-char-app-password"
$env:RESET_URL_BASE = "https://kumusta-ai-app.web.app/reset-password"
```

Deploy the functions:

```powershell
firebase deploy --only functions
```

After deployment, you'll see output like:
```
✓ Function URL (requestPasswordReset): https://us-central1-kumusta-ai.cloudfunctions.net/requestPasswordReset
✓ Function URL (resetPassword): https://us-central1-kumusta-ai.cloudfunctions.net/resetPassword
```

### Step 3: Update Firebase Configuration (if needed)

The frontend is already configured to use the Cloud Functions. If you need to update the URLs, edit `src/utils/firebase.js`.

---

## How It Works

1. **User requests password reset**: 
   - Enters email on Forgot Password page
   - Frontend calls `requestPasswordReset` Cloud Function
   
2. **Cloud Function generates reset link**:
   - Uses Firebase Admin SDK to generate official reset code
   - Creates HTML/text email with reset link
   - Sends via Gmail SMTP
   
3. **User clicks reset link in email**:
   - Redirected to Reset Password page
   - URL contains `oobCode` and `mode=resetPassword`
   
4. **User sets new password**:
   - Frontend calls `resetPassword` Cloud Function
   - Cloud Function confirms reset using Firebase Admin SDK
   - User is redirected to login

---

## Testing

### Test Password Reset Flow:

1. Start your dev server: `npm run dev`
2. Go to login page → Click "Forgot Password"
3. Enter a test email (must exist in Firebase Auth)
4. Check Gmail inbox (check Spam folder too)
5. Click the reset link in email
6. Enter new password and confirm
7. Try logging in with new password

### Troubleshooting:

**Email not arriving:**
- Check Gmail App Password is correct
- Verify EMAIL_USER environment variable is set
- Check Firebase console Cloud Functions logs for errors
- Gmail might block from new locations (check Gmail Security settings)

**Invalid reset code error:**
- Link might have expired (expires in 1 hour)
- User might not exist in Firebase Auth
- Check Cloud Function logs for exact error

**Rate limiting:**
- Firebase limits password resets to ~10 per user per day
- Wait a bit and try again

---

## Security Notes

✅ Reset links expire in 1 hour
✅ Uses Firebase official password reset mechanism
✅ Email credentials stored in Firebase environment variables (not in code)
✅ No passwords transmitted in reset link (only recovery code)
✅ Uses SMTP encryption for email transmission

---

## Environment Variables Required

```
EMAIL_USER = your-gmail@gmail.com
EMAIL_PASSWORD = your-16-char-app-password  
RESET_URL_BASE = https://kumusta-ai-app.web.app/reset-password
```

These are set in Firebase Console → Functions → Runtime Environment Variables

---

## Files Modified

- `firebase-functions/functions/passwordReset.js` - NEW: Complete Cloud Function
- `firebase-functions/functions/package.json` - Added nodemailer dependency
- `src/pages/ForgotPassword.jsx` - Updated to call Cloud Function
- `src/pages/ResetPassword.jsx` - Updated to call Cloud Function

---

## Next Steps

1. Deploy Cloud Functions with credentials
2. Test the full password reset flow
3. Monitor Firebase logs for any issues
4. (Optional) Set up Gmail forwarding to your personal email

---

## Alternative: Use Your Own Email Service

If you prefer not to use Gmail, you can modify `passwordReset.js` to use:
- SendGrid
- AWS SES
- Mailgun
- Any SMTP provider

Just update the `nodemailer.createTransport()` configuration.
