# Firebase Configuration Checklist - QUICK START

## ✅ Your App Status
- **Dev Server:** Running on `http://localhost:5174/`
- **Firebase Project:** kumusta-ai
- **Authentication:** Email/Password (configured)
- **Database:** Firestore (configured)
- **Password Reset Code:** Ready to test

---

## 🔧 IMMEDIATE SETUP (5 minutes)

### 1. Open Firebase Console
```
https://console.firebase.google.com/
```
Select **kumusta-ai** project

---

### 2. Enable Authentication
**Path:** Authentication → Sign-in method

Check these are ✅ **ENABLED:**
- [ ] Email/Password
- [ ] Email Link/Passwordless (optional)

---

### 3. Configure Password Reset Email
**Path:** Authentication → Templates

Find **"Password reset"** template:

1. Click the **pencil icon** to edit
2. Customize the email:
   ```
   Subject: Reset your Kumusta AI password
   
   Body: 
   Hello,
   
   Click the link below to reset your password:
   
   {{ link }}
   
   Link expires in 1 hour.
   ```
3. Click **Save**

---

### 4. Add Authorized Domains
**Path:** Authentication → Settings → Authorized domains

Add these:
```
localhost:5174
localhost:5173
```

(Add your production domain later)

---

### 5. Configure Firestore Rules
**Path:** Firestore Database → Rules

Replace all rules with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usernames/{username} {
      allow read: if true;
      allow create, write: if request.auth != null;
    }
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow create: if request.auth.uid == uid;
      allow write: if request.auth.uid == uid;
      match /{document=**} {
        allow read, write: if request.auth.uid == uid;
      }
    }
  }
}
```
Click **Publish** (confirm when prompted)

---

## 🧪 TEST PASSWORD RESET

### Test Steps:
1. Open `http://localhost:5174/` in your browser
2. Click **Sign In** → **Forgot password?**
3. Enter a registered user's email
4. **Check your email inbox** (and spam folder)
5. Look for email from Firebase: "Reset your Kumusta AI password"
6. **Click the reset link** in the email
7. Copy the code from the URL (after `oobCode=`)
8. Return to the app and paste the code
9. Enter a new password
10. Click **"Reset Password"**
11. You should see a success message and be redirected to login

---

## ❌ Troubleshooting

### "No account found with email"
- User must be registered first
- Use an email from an existing account

### Email not received
- **Check spam/promotions folder**
- Wait 30-60 seconds (first email takes time)
- Verify email address is correct
- Check if Email/Password is enabled in Firebase
- Check Firestore has user data in `users` collection

### Reset code not working
- Code expires after 1 hour
- Make sure it's the full code (copy from URL)
- Try requesting a new reset email
- Check browser console (F12) for errors

### "Invalid or expired reset code"
- Request a new password reset email
- Don't wait more than 1 hour to use code

---

## 📋 Firestore Database Structure

Your app expects this structure:

```
firestore/
├── usernames/
│   └── {username}/
│       └── uid: "user_id"
│
└── users/
    └── {uid}/
        ├── fullName: "User Name"
        ├── username: "username"
        ├── email: "username@kumusta.app"
        ├── createdAt: "2024-05-07T..."
        ├── moods: []
        ├── streak: 0
        ├── lastMoodDate: ""
        └── chatHistory: []
```

---

## 🚀 Files to Review

**Configuration:**
- [src/utils/firebase.js](src/utils/firebase.js) - Firebase credentials ✅

**Features:**
- [src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx) - Password reset form ✅
- [src/pages/Login.jsx](src/pages/Login.jsx) - Login page ✅
- [src/pages/Register.jsx](src/pages/Register.jsx) - Registration ✅
- [src/utils/users.js](src/utils/users.js) - Auth logic ✅

---

## ✨ Everything Configured For:

✅ Email/Password authentication  
✅ Password reset with OTP code  
✅ Account registration  
✅ Secure Firestore rules  
✅ User profile management  
✅ Persistent user sessions  

**Ready to test!**
