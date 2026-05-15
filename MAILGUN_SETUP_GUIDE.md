# Mailgun Email Integration Setup Guide

## Overview
This guide sets up Mailgun to send custom password reset emails from your Kumusta AI app via Firebase Cloud Functions.

**Why Mailgun?**
- ✅ Free tier: 5,000 emails/month
- ✅ No credit card required for free tier
- ✅ Reliable delivery
- ✅ Full email template control
- ✅ Easy API integration

---

## Step 1: Create Mailgun Account

### 1.1 Sign Up
1. Go to [Mailgun.com](https://www.mailgun.com)
2. Click **Sign Up** 
3. Enter your email and create password
4. Choose your region (select closest to you)
5. Click **Sign Up**

### 1.2 Verify Email
- Check your inbox for verification email
- Click the verification link
- Account is now active!

### 1.3 Access Dashboard
1. Log in to [Mailgun Dashboard](https://app.mailgun.com)
2. You should see "Sending Domain" section
3. A sandbox domain will be created automatically (e.g., `sandbox-abc123.mailgun.org`)

---

## Step 2: Get API Credentials

### 2.1 Find Your API Key
1. In Mailgun Dashboard, click **API Security** in left sidebar
2. Look for **API Keys** section
3. You'll see a "Private API Key" - it looks like: `key-abc123xyz789...`
4. **Copy this key** - you'll need it in Step 4

### 2.2 Get Domain Information
1. Click **Sending Domains** in left sidebar
2. You should see a domain like: `sandbox-abc123.mailgun.org`
3. Note this domain - you'll need it in Step 4

---

## Step 3: Configure Firebase Cloud Functions

### 3.1 Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 3.2 Initialize Firebase Functions (if not done)

Navigate to your project folder:
```bash
cd "c:\Users\NORMA\OneDrive\Documents\CS ELECTIVE CHATBOT FILES"
firebase init functions
```

Follow the prompts:
- Select **JavaScript**
- Say **Yes** to ESLint (optional but recommended)
- Say **Yes** to install dependencies

### 3.3 Copy Function Files

The function files have been created at:
```
firebase-functions/functions/
├── index.js
├── package.json
└── sendPasswordResetEmail.js
```

Make sure these files exist in your `firebase-functions/functions/` folder.

---

## Step 4: Set Environment Variables

### 4.1 Create `.env.local` File

In the `firebase-functions` folder, create a new file named `.env.local`:

```
MAILGUN_API_KEY=key-your-api-key-here
MAILGUN_DOMAIN=sandbox-abc123.mailgun.org
```

**Replace:**
- `key-your-api-key-here` → Your actual API key from Step 2.1
- `sandbox-abc123.mailgun.org` → Your actual domain from Step 2.2

### 4.2 Load Environment Variables

The Cloud Function automatically loads these from `.env.local` or Firebase environment variables.

To set them permanently in Firebase:
```bash
firebase functions:config:set mailgun.api_key="key-your-api-key-here" mailgun.domain="sandbox-abc123.mailgun.org"
```

---

## Step 5: Test Locally (Optional)

### 5.1 Start Emulator

```bash
firebase emulators:start --only functions
```

You should see:
```
✓ Functions emulator started at http://localhost:5001
```

### 5.2 Test the Function

In another terminal:
```bash
curl -X POST http://localhost:5001/kumusta-ai/us-central1/sendPasswordResetEmail \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com","resetCode":"test-code-123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Password reset email sent successfully",
  "messageId": "..."
}
```

Check your email for the test message!

---

## Step 6: Deploy to Firebase

### 6.1 Deploy Functions

```bash
firebase deploy --only functions
```

You should see:
```
✓ Function URL (sendPasswordResetEmail): https://us-central1-kumusta-ai.cloudfunctions.net/sendPasswordResetEmail
```

**Save this URL!** You'll need it in the next section.

### 6.2 Check Deployment

```bash
firebase functions:list
```

You should see `sendPasswordResetEmail` listed.

---

## Step 7: Update Frontend Code

Update `src/utils/firebase.js` to add the Cloud Function URL:

```javascript
// Add after your firebase config
export const SEND_PASSWORD_RESET_EMAIL_FUNCTION = 'https://us-central1-kumusta-ai.cloudfunctions.net/sendPasswordResetEmail'
```

---

## Step 8: Update ForgotPassword Component

The ForgotPassword component needs to call your Cloud Function. Update the handler:

```javascript
const handleEmailSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    if (!email.trim()) {
      throw new Error('Email is required')
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      throw new Error('Please enter a valid email address')
    }
    
    console.log('Requesting password reset email for:', email.trim())
    
    // Call your Cloud Function first to send the custom email
    // Firebase will also send its default email automatically
    // You can disable Firebase email and use only your Cloud Function
    
    await sendPasswordResetEmail(auth, email.trim(), {
      url: `${window.location.origin}/reset-password`,
      handleCodeInApp: false
    })
    
    // Get the reset code from Firebase Auth
    // Note: You'll need to intercept this or get it from the user's email
    
    setSuccess(true)
    setLoading(false)
    setTimeout(() => setEmail(''), 3000)
  } catch (err) {
    // ... error handling ...
  }
}
```

---

## Step 9: Testing

### 9.1 Add Test Email Allowlist

In Mailgun Dashboard → Sending Domain:
1. Click **Authorized Recipients** (for sandbox domains)
2. Add test email addresses you want to send to
3. Example: `your-email@gmail.com`

Without this, sandbox domains can only send to authorized emails.

### 9.2 Test Password Reset Flow

1. Go to your app's login page
2. Click "Forgot Password"
3. Enter your test email
4. Check your email inbox
5. You should receive the custom Kumusta AI password reset email!
6. Click the reset link
7. Set your new password

---

## Upgrading Beyond Sandbox Domain

When you're ready for production:

### Verify Your Custom Domain
1. In Mailgun Dashboard, click **Sending Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `mail.kumusta-ai.com`)
4. Follow the DNS verification steps
5. Once verified, you can send from any email on that domain

### Update Email Sender
In `sendPasswordResetEmail.js`, change:
```javascript
const SENDER_EMAIL = 'noreply@kumusta-ai.com' // Use your custom domain
```

---

## Troubleshooting

### "401 Unauthorized" Error
**Problem:** Mailgun API key is wrong or expired
**Solution:** 
1. Check API key in `.env.local` is correct
2. Generate new API key in Mailgun Dashboard
3. Update `.env.local` and redeploy

### Email Not Received
**Problem:** Email goes to spam or doesn't arrive
**Solutions:**
1. Check authorized recipients list (sandbox mode)
2. Wait 1-2 minutes (emails can be slow)
3. Check spam/promotions folder
4. Verify email address is correct in your app
5. Check Mailgun Dashboard → Logs for delivery status

### Function Returns 404
**Problem:** Cloud Function URL is wrong
**Solution:**
1. Check the deployed URL: `firebase functions:list`
2. Make sure you deployed: `firebase deploy --only functions`
3. Copy the exact URL and paste in frontend

### "mailgun.js not found" Error
**Problem:** Dependencies not installed
**Solution:**
1. Navigate to `firebase-functions/functions/`
2. Run: `npm install`
3. Redeploy: `firebase deploy --only functions`

---

## Mailgun Free Plan Limits

- **5,000 emails/month** ✅ Great for most apps
- **1 sender domain** (sandbox or verified)
- **Sandbox domain** (for testing)
- **Logs and analytics**

If you exceed 5,000 emails/month, consider:
1. Upgrade to paid plan (~$35/month)
2. Use SendGrid free tier (100 emails/day = ~3,000/month)
3. Use AWS SES (very cheap, pay-per-email)

---

## Advanced: Use Only Cloud Function

For full customization, you can disable Firebase's default email and use ONLY your Cloud Function:

In `ForgotPassword.jsx`:
```javascript
// Instead of using Firebase's sendPasswordResetEmail,
// Call your Cloud Function directly

const resetCode = 'generated-code-here' // You need to generate this

try {
  const response = await fetch(
    'https://us-central1-kumusta-ai.cloudfunctions.net/sendPasswordResetEmail',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.trim(),
        resetCode: resetCode 
      })
    }
  )
  
  if (!response.ok) throw new Error('Failed to send email')
  
  setSuccess(true)
} catch (err) {
  setError(err.message)
}
```

---

## Email Template Customization

To modify the email template, edit `sendPasswordResetEmail.js`:

1. Find the `htmlEmail` template around line 70
2. Modify the HTML/CSS as needed
3. Update the `textEmail` version too (for email clients that don't support HTML)
4. Redeploy: `firebase deploy --only functions`

---

## Support & Resources

- [Mailgun Documentation](https://documentation.mailgun.com)
- [Firebase Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Mailgun JavaScript SDK](https://github.com/mailgun/mailgun.js)

---

## Quick Checklist

- [ ] Create Mailgun account
- [ ] Get API key and domain
- [ ] Set up Firebase Cloud Functions
- [ ] Configure environment variables
- [ ] Deploy functions: `firebase deploy --only functions`
- [ ] Copy Cloud Function URL
- [ ] Update frontend code with function URL
- [ ] Test password reset flow
- [ ] Verify email is received
- [ ] Check for spam folder

---

## Security Notes

✅ **Do:**
- Keep API key secret (use environment variables)
- Don't commit API key to Git
- Use HTTPS for all requests
- Validate email on backend

❌ **Don't:**
- Put API key in client-side code
- Expose API key in logs
- Use old/unused API keys

---

**Last Updated:** 2024
**Version:** 1.0
**Status:** Ready to use
