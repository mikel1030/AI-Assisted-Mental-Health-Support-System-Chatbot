# Password Reset with Mailgun - Quick Start (5 Minutes)

## What You'll Get
✅ Real emails sent to users  
✅ Custom email template with your branding  
✅ Fully working password reset flow  
✅ No Firebase template editing restrictions  

---

## Step 1: Create Mailgun Account (2 minutes)

1. Go to **[mailgun.com](https://www.mailgun.com)**
2. Click **Sign Up** → Choose your region → Click **Sign Up**
3. Check your email and verify your account
4. Log in to Mailgun Dashboard

---

## Step 2: Get Your API Credentials (1 minute)

### Get API Key:
1. In Mailgun Dashboard, click **API Security** (left sidebar)
2. Copy your "Private API Key" (looks like: `key-abc123xyz...`)
3. **Save this somewhere safe!** You'll need it next

### Get Domain:
1. Click **Sending Domains** (left sidebar)
2. Find the default domain like: `sandbox-abc123.mailgun.org`
3. **Copy and save this too!**

---

## Step 3: Deploy Cloud Functions (2 minutes)

Open PowerShell and navigate to your project:

```powershell
cd "c:\Users\NORMA\OneDrive\Documents\CS ELECTIVE CHATBOT FILES\firebase-functions\functions"
npm install
```

Then set environment variables and deploy:

```powershell
# Windows PowerShell - Set environment variables
$env:MAILGUN_API_KEY = "key-your-api-key-from-step-2"
$env:MAILGUN_DOMAIN = "sandbox-abc123.mailgun.org"

# Deploy functions
firebase deploy --only functions
```

**After deployment, you'll see:**
```
✓ Function URL (sendPasswordResetEmail): https://us-central1-kumusta-ai.cloudfunctions.net/sendPasswordResetEmail
```

**Copy this URL!** You'll need it next.

---

## Step 4: Update Your Frontend (1 minute)

### Add the function URL to your firebase config:

Edit `src/utils/firebase.js` and add at the bottom:

```javascript
export const SEND_PASSWORD_RESET_EMAIL_FUNCTION = 'https://us-central1-kumusta-ai.cloudfunctions.net/sendPasswordResetEmail'
```

(Replace with your actual function URL from Step 3)

---

## Step 5: Test It! (1 minute)

1. Start your app: `npm run dev`
2. Go to login page → Click "Forgot Password"
3. Enter your email
4. Click "Send Reset Link"
5. **Check your email inbox** - You should get the custom Kumusta AI email!
6. Click the reset link
7. Set a new password
8. Log in with new password ✅

---

## 🎉 Done!

Your password reset system is now working with custom emails from Mailgun!

---

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Email not received | Check spam folder, verify email in Mailgun sandbox allowlist |
| "401 Unauthorized" error | Check API key is correct in .env.local |
| Function URL shows 404 | Run `firebase deploy --only functions` again |
| Email template looks wrong | Edit `sendPasswordResetEmail.js` and redeploy |

---

## Next Steps (Optional)

### Verify Custom Domain (for production)
- Mailgun sandbox is fine for testing
- For production, add your own domain in Mailgun
- See full guide: [MAILGUN_SETUP_GUIDE.md](./MAILGUN_SETUP_GUIDE.md)

### Customize Email Template
- Edit the HTML in `sendPasswordResetEmail.js` line ~70
- Change colors, text, logo, etc.
- Redeploy: `firebase deploy --only functions`

---

## Full Documentation

For detailed setup, troubleshooting, and advanced options:  
👉 See [MAILGUN_SETUP_GUIDE.md](./MAILGUN_SETUP_GUIDE.md)

---

**Status:** ✅ Ready to use!
