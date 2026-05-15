# Firebase Configuration Guide - Kumusta AI Chatbot

## Project Details
- **Firebase Project:** kumusta-ai
- **Auth Domain:** kumusta-ai.firebaseapp.com
- **Project ID:** kumusta-ai

---

## Step 1: Enable Authentication Methods

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **kumusta-ai** project
3. Navigate to **Authentication** → **Sign-in method**
4. Enable these providers:
   - ✅ **Email/Password** (already enabled)
   - ✅ **Email Link/Passwordless** (optional, for better UX)

---

## Step 2: Configure Password Reset Email Template

### Access Email Templates:
1. Go to **Authentication** → **Templates** (or **Email Templates**)
2. Find **"Password reset"** template
3. Click **Edit** (pencil icon)

### Password Reset Template Settings:
**Email Address:** `noreply@kumusta-ai.firebaseapp.com` (or your custom domain)

**Subject:** `Reset your Kumusta AI password`

**Email Body Example:**
```
Hello,

Click the link below to reset your password for Kumusta AI:

{{ link }}

If you didn't request this, you can ignore this email.

This link will expire in 1 hour.

Best regards,
Kumusta AI Team
```

**Custom Domain (Optional):**
- To send from a custom email (e.g., support@yourdomain.com):
  1. Go to **Authentication** → **Settings** → **Authorized domains**
  2. Add your domain
  3. Set up SPF/DKIM records in your domain registrar

### Action URL Configuration:
1. Go to **Authentication** → **Settings**
2. Scroll to **"Authorized domains"**
3. Add your domain(s):
   ```
   localhost:5174
   localhost:5173
   yourdomain.com
   ```

4. Set password reset continuation URL:
   - Route: `/login` or `/forgotpassword`
   - Firebase will append `?oobCode=RESET_CODE` to redirect

---

## Step 3: Configure Firestore Security Rules

Go to **Firestore Database** → **Rules**

Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public access to usernames collection (for login)
    match /usernames/{username} {
      allow read: if true;
      allow create, write: if request.auth != null;
    }
    
    // Users can only read/write their own data
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow create: if request.auth.uid == uid;
      allow write: if request.auth.uid == uid;
      
      // Subcollections
      match /{document=**} {
        allow read, write: if request.auth.uid == uid;
      }
    }
  }
}
```

---

## Step 4: Configure CORS (if needed for emails)

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Ensure these are listed:
   - `localhost:5174` (development)
   - `localhost:5173` (alternative dev port)
   - Your production domain

---

## Step 5: Test Password Reset Email

### Test Flow:
1. Open your app: `http://localhost:5174/`
2. Go to **Sign In** → Click **"Forgot password?"**
3. Enter a registered user's email
4. Check email inbox and spam folder
5. Click the reset link (contains `oobCode` parameter)
6. You'll be redirected to `/login` with the code
7. Enter reset code and new password on the forgot password page

### What to Check:
- [ ] Email arrives within 30 seconds
- [ ] Email contains valid reset link
- [ ] Reset link works when clicked
- [ ] New password saves successfully
- [ ] Can login with new password

---

## Step 6: Production Deployment Checklist

Before deploying to production:

```javascript
☐ Firebase project is in production mode (not test/free tier)
☐ Firestore rules are set correctly (not in test mode)
☐ Email/Password authentication is enabled
☐ Password reset email template is configured
☐ Production domain is added to Authorized domains
☐ Custom email domain is set up (optional)
☐ Firebase Admin SDK configured for backend (if using Cloud Functions)
☐ Rate limiting is enabled to prevent abuse
```

---

## Troubleshooting

### Problem: "No account found with email"
**Solution:** 
- Email doesn't have an account in Firebase
- Check if user was registered with Firebase Auth (not just Firestore)

### Problem: Password reset email not received
**Solution:**
- Check spam/promotions folder
- Wait 30-60 seconds (first email can be slow)
- Verify email address is correct
- Check Firebase quota limits (free tier has limits)
- Ensure Email/Password authentication is enabled

### Problem: "Invalid or expired reset code"
**Solution:**
- Reset code expires after 1 hour
- Make sure you're copying the full code
- Try requesting a new reset email

### Problem: Reset link doesn't work when clicked
**Solution:**
- Ensure `/login` route is added to Authorized domains
- Try manually copying the `oobCode` parameter from URL
- Check browser console for errors

---

## Firebase SDK Used

```json
{
  "firebase": "^10.x.x",
  "firebase/auth": "for authentication",
  "firebase/firestore": "for database"
}
```

---

## Password Reset Code Flow

```
1. User enters email → sendPasswordResetEmail()
   ↓
2. Firebase sends email with reset link containing "oobCode"
   ↓
3. User clicks link or enters code manually
   ↓
4. App receives oobCode parameter
   ↓
5. confirmPasswordReset(auth, oobCode, newPassword)
   ↓
6. Firebase verifies code and updates password
   ↓
7. User redirected to login page
```

---

## File References

- **Firebase Config:** [src/utils/firebase.js](src/utils/firebase.js)
- **Reset Logic:** [src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx)
- **User Auth:** [src/utils/users.js](src/utils/users.js)
- **Login Page:** [src/pages/Login.jsx](src/pages/Login.jsx)

---

## Support

If emails still don't work:
1. Check Firebase Console → Insights → Error logs
2. Verify credentials in [src/utils/firebase.js](src/utils/firebase.js)
3. Check browser console (F12) for client-side errors
4. Review [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
