import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../utils/users'
import { setCurrentUserLocally } from '../utils/storage'
import '../styles/Login.css'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

export default function Register({ onLogin }) {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!fullName.trim()) throw new Error('Full name is required')
      if (!username.trim()) throw new Error('Username is required')
      if (!password) throw new Error('Password is required')
      if (password.length < 8) throw new Error('Password must be at least 8 characters')
      if (password !== confirmPassword) throw new Error('Passwords do not match')

      const newUser = await registerUser(fullName.trim(), username.trim(), password)

      localStorage.setItem('currentUID', newUser.uid)
      setCurrentUserLocally(newUser.username, newUser.fullName)

      onLogin()
      navigate('/home')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Username already taken. Please choose another.')
      } else {
        setError(err.message || 'Registration failed. Please try again.')
      }
    } finally {
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

        <form onSubmit={handleRegister} className="login-form">
          <h2>Create Account</h2>
          <p className="login-subtitle">Start your mental health journey today</p>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ paddingRight: '44px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                disabled={loading}
                className="eye-toggle"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                style={{ paddingRight: '44px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                disabled={loading}
                className="eye-toggle"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '6px' }}>Passwords do not match</p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p style={{ color: '#27ae60', fontSize: '12px', marginTop: '6px' }}>✓ Passwords match</p>
            )}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
            Sign in
          </Link>
        </div>

        <div className="login-features">
          <div className="feature-item">
            <span className="feature-icon">💬</span>
            <p>24/7 AI Support</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <p>Track Progress</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌬️</span>
            <p>Wellness Tools</p>
          </div>
        </div>

      </div>
    </div>
  )
}