# Password Reset Feature - Quick Reference

## For Users: How to Reset Your Password

### Step-by-Step Guide

#### **Step 1: Go to Forgot Password Page**
1. On the login page, click **"Forgot your password?"** link
2. You'll be taken to the password reset page

#### **Step 2: Enter Your Email**
1. Enter the email address associated with your Kumusta AI account
2. Click **"📧 Send Reset Link"**
3. Wait for confirmation message

#### **Step 3: Check Your Email**
1. Go to your email inbox
2. Look for an email from **Kumusta AI Support**
   - **Subject:** "Reset Your Kumusta AI Password"
   - **From:** noreply@kumusta-ai.firebaseapp.com
3. **⏰ Important:** The reset link expires in **1 hour**

#### **Step 4: Click Reset Link**
1. Open the email
2. Click the **"Reset Your Password"** button
3. Or copy the link from the email and paste it in your browser

#### **Step 5: Set New Password**
1. You'll be taken to a page showing your email
2. Enter your new password
3. Confirm your new password
4. Click **"✓ Reset Password"**

#### **Step 6: Log In**
1. You'll see a success message
2. Click **"Go to Login Now"** or go to the login page
3. Log in with your new password

---

## If You Don't Receive the Email

### Check These First:
1. **Wait 1-2 minutes** - emails can be slow
2. **Check SPAM/Promotions folder** - emails might be filtered
3. **Check the correct email** - make sure you entered the right email
4. **Try again** - you can request a new link if needed

### If Still Not Working:
1. Go back to forgot password page
2. Try with a different email address
3. Check that you used this email when creating your account
4. Wait a few hours and try again (Firebase limits: ~10 resets per day per email)

---

## Security Reminders ⚠️

✅ **What to Do:**
- Use a strong password with letters, numbers, and symbols
- Keep the reset link private - don't share it
- Only click reset links from your own browser
- Act immediately when you receive the link (expires in 1 hour)

❌ **What NOT to Do:**
- Don't share the reset link with anyone else
- Don't post the link online or in messages
- Kumusta AI support will NEVER ask for your password
- Never enter passwords on unsecured websites (use HTTPS)

---

## Troubleshooting

### "No account found with this email"
**This means:** You don't have an account with that email
- Check you entered the correct email
- Create a new account if needed

### "Invalid email address"
**This means:** The email format is wrong
- Make sure it looks like: `name@example.com`
- No spaces or special characters

### "Too many reset attempts"
**This means:** You've requested too many resets today
- Wait a few hours and try again
- Firebase limits to ~10 resets per email per day for security

### "Invalid or expired reset link"
**This means:** 
- The 1-hour time limit has passed
- Request a new reset link from the forgot password page

### "Password reset successful but can't log in"
**Try:**
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Wait a few seconds - it takes time to update
3. Try logging in again with new password
4. Restart your browser

---

## Account Recovery Options

If you can't reset your password:
1. Use "Forgot Password" feature (as above)
2. Contact support team for help
3. Create a new account with a different email

---

## For Developers: Implementation Details

### Code Structure
```
ForgotPassword.jsx
  ↓ User enters email
  ↓ Calls sendPasswordResetEmail(auth, email)
  ↓ Firebase sends email with reset link
  ↓
ResetPassword.jsx (when user clicks email link)
  ↓ Extracts oobCode from URL parameters
  ↓ Verifies code with verifyPasswordResetCode()
  ↓ User enters new password
  ↓ Calls confirmPasswordReset(auth, code, newPassword)
  ↓ Firebase confirms and updates password
```

### Key Files
- [ForgotPassword.jsx](../src/pages/ForgotPassword.jsx) - Initial email request
- [ResetPassword.jsx](../src/pages/ResetPassword.jsx) - Password change after email link
- [App.jsx](../src/App.jsx) - Routes for both pages
- [firebase.js](../src/utils/firebase.js) - Firebase configuration

### API Flow
1. **Email Request:** `sendPasswordResetEmail(auth, email, {url, handleCodeInApp})`
2. **Code Verification:** `verifyPasswordResetCode(auth, code)`
3. **Password Confirmation:** `confirmPasswordReset(auth, code, newPassword)`

### URL Parameters
When user clicks email link, they're sent to:
```
https://yourdomain.com/reset-password?oobCode=XXXXX&mode=resetPassword&apiKey=YYYYY
```

ResetPassword.jsx automatically:
- Extracts `oobCode` from URL
- Verifies it's valid
- Shows password reset form
- Submits new password

---

## Email Template Customization

The email template is customized at:
**Firebase Console → Authentication → Templates → Password Reset**

Current template includes:
- Branding (Kumusta AI logo)
- Clear instructions
- Reset button
- Security warnings
- Support contact info
- 1-hour expiration notice

To modify:
1. Go to Firebase Console
2. Go to Authentication → Templates
3. Edit "Password reset" template
4. Save changes

---

## Common Questions

**Q: How long does the reset link work?**
A: 1 hour from when the email is sent

**Q: Can I reset someone else's password?**
A: No, you need access to their email account

**Q: What if I reset my password by mistake?**
A: You can reset it again using the same process

**Q: Does my old password still work?**
A: No, once you reset, only the new password works

**Q: How do I know if someone tried to reset my password?**
A: You'll receive an email. If you didn't request it, ignore it - the link will expire after 1 hour

---

## Testing Your Reset Link

To test password reset in development:
1. Create a test account: use any email you can access
2. Go to forgot password page
3. Enter your test email
4. Check your email (might take 1-2 minutes)
5. Click the reset link
6. Set a new password
7. Try logging in with the new password

---

## Feedback & Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Check browser console for error messages (F12)
3. Try a different browser
4. Clear browser cache
5. Contact support team

---

**Last Updated:** 2024
**Version:** 1.0
