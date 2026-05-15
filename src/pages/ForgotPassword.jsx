import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../utils/firebase'
import '../styles/Login.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

      const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: false
      }

      await sendPasswordResetEmail(auth, email.trim(), actionCodeSettings)
      setSuccess(true)
      setLoading(false)

      setTimeout(() => {
        setEmail('')
      }, 3000)
    } catch (err) {
      console.error('❌ Error sending reset email:', err.code, err.message)

      if (err.code === 'auth/user-not-found') {
        setError(`No account found with email: ${email}. Please check and try again.`)
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address. Please check and try again.')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many reset attempts. Please try again later. Check your email!')
      } else if (err.code === 'auth/invalid-action-code') {
        setError('Invalid action code. Please try again.')
      } else if (err.message?.includes('CONFIGURATION_NOT_FOUND')) {
        setError('Email service is not properly configured. Please contact support.')
      } else {
        setError(err.message || 'Failed to send reset email. Please try again.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>🌿 Kumusta AI</h1>
          <p className="tagline">Your Personal Mental Health Companion</p>
        </div>

        {success ? (
          <div className="login-form" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
            <h2>Check Your Email!</h2>
            <p className="login-subtitle" style={{ marginBottom: '20px' }}>
              Password reset link sent to <strong style={{ color: '#27ae60' }}>{email}</strong>
            </p>
            <div style={{
              fontSize: '13px',
              color: '#333',
              marginBottom: '24px',
              textAlign: 'left',
              backgroundColor: '#e8f5e9',
              padding: '16px',
              borderRadius: '8px',
              borderLeft: '4px solid #27ae60',
              lineHeight: '1.7'
            }}>
              <strong style={{ display: 'block', marginBottom: '10px', color: '#27ae60' }}>✅ What to do next:</strong>
              <ol style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Check your inbox</strong> for an email from Kumusta AI (noreply@kumusta-ai.firebaseapp.com)</li>
                <li><strong>Look in your Spam/Promotions</strong> folder if you don't see it</li>
                <li><strong>Click the "Reset Password" link</strong> in the email</li>
                <li><strong>Enter your new password</strong> and confirm it</li>
                <li><strong>Log in with your new password</strong></li>
              </ol>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
              <strong> Important:</strong> This link will expire in 1 hour for security reasons.
            </p>
            <button
              className="login-button"
              onClick={() => { setSuccess(false); setEmail('') }}
              style={{ backgroundColor: '#3498db' }}
            >
              Send Another Email
            </button>
            <div style={{
              fontSize: '12px',
              color: '#999',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #ddd'
            }}>
              <strong>Didn't receive email?</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px' }}>
                <li>Wait a few minutes (emails may take time to arrive)</li>
                <li>Check your spam/junk folder</li>
                <li>Try with a different email if you have multiple accounts</li>
                <li>Click "Send Another Email" above to resend</li>
              </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <h2>Forgot Your Password?</h2>
            <p className="login-subtitle">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address <span style={{ color: '#e74c3c' }}>*</span></label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
              />
              <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>
                Enter the email address associated with your Kumusta AI account
              </small>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? ' Sending Email...' : ' Send Reset Link'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
              <span>Remember your password?</span>{' '}
              <Link to="/login" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
                Sign In
              </Link>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#555' }}>
          <Link to="/login" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to Sign In
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', color: '#555' }}>
          New user?{' '}
          <Link to="/register" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
            Create an account
          </Link>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f0faf4',
          borderRadius: '12px',
          borderLeft: '4px solid #27ae60',
          fontSize: '13px',
          color: '#555',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#27ae60' }}> Security Tip:</strong> We'll never ask for your password via email. We'll only send you a secure link to reset it yourself.
        </div>
      </div>
    </div>
  )
}