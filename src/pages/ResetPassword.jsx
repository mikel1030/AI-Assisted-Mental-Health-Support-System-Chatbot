import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth } from '../utils/firebase'
import '../styles/Login.css'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [resetCode, setResetCode] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  // Extract reset code from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('oobCode')
    const mode = params.get('mode')

    if (mode === 'resetPassword' && code) {
      setResetCode(code)
      verifyCode(code)
    } else {
      setError('Invalid password reset link. Please request a new one.')
      setVerifying(false)
    }
  }, [])

  const verifyCode = async (code) => {
    try {
      // Verify the reset code is valid
      const email = await verifyPasswordResetCode(auth, code)
      setUserEmail(email)
      setVerifying(false)
      console.log('Reset code verified for email:', email)
    } catch (err) {
      console.error('Error verifying reset code:', err)
      if (err.code === 'auth/invalid-action-code') {
        setError('Invalid or expired reset link. Please request a new one.')
      } else if (err.code === 'auth/expired-action-code') {
        setError('This reset link has expired. Please request a new one.')
      } else {
        setError(err.message || 'Invalid reset link. Please try again.')
      }
      setVerifying(false)
    }
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!newPassword) {
      setError('Password is required')
      return
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      console.log('Resetting password for:', userEmail)
      
      // Confirm the password reset with the new password
      await confirmPasswordReset(auth, resetCode, newPassword.trim())
      
      console.log('Password reset successfully for:', userEmail)
      setSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      console.error('Error resetting password:', err)
      
      if (err.code === 'auth/invalid-action-code') {
        setError('Invalid or expired reset code. Please request a new one.')
      } else if (err.code === 'auth/expired-action-code') {
        setError('This reset link has expired. Please request a new one.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password with letters, numbers, and symbols.')
      } else {
        setError(err.message || 'Failed to reset password. Please try again.')
      }
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-logo">
            <h1>🌿 Kumusta AI</h1>
            <p className="tagline">Your Personal Mental Health Companion</p>
          </div>
          
          <div className="login-form" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>⏳</div>
            <h2>Verifying Reset Link...</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>Please wait while we verify your password reset link.</p>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #e0e0e0',
              borderTop: '4px solid #27ae60',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
            <Link to="/login" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
              ← Back to Sign In
            </Link>
          </div>
        </div>
        <div className="login-bg-decoration"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-logo">
            <h1>🌿 Kumusta AI</h1>
            <p className="tagline">Your Personal Mental Health Companion</p>
          </div>

          <div className="login-form" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h2>Password Reset Successful!</h2>
            <p className="login-subtitle" style={{ marginBottom: '24px', color: '#27ae60' }}>
              Your password has been updated successfully.
            </p>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              You can now log in with your new password.
            </p>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '24px' }}>
              Redirecting to login page in a moment...
            </p>
            <button
              className="login-button"
              onClick={() => { navigate('/login') }}
            >
              Go to Login Now
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
            <Link to="/login" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
              ← Back to Sign In
            </Link>
          </div>
        </div>
        <div className="login-bg-decoration"></div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>🌿 Kumusta AI</h1>
          <p className="tagline">Your Personal Mental Health Companion</p>
        </div>

        <form onSubmit={handleResetSubmit} className="login-form">
          <h2>Reset Your Password</h2>
          {userEmail && (
            <p className="login-subtitle">
              Resetting password for <strong style={{ color: '#27ae60' }}>{userEmail}</strong>
            </p>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="newPassword">New Password <span style={{ color: '#e74c3c' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <small style={{ color: '#999', marginTop: '4px', display: 'block' }}>
              Use a strong password with letters, numbers, and symbols for better security
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password <span style={{ color: '#e74c3c' }}>*</span></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '🔄 Resetting Password...' : '✓ Reset Password'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
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
      </div>
      <div className="login-bg-decoration"></div>
    </div>
  )
}
