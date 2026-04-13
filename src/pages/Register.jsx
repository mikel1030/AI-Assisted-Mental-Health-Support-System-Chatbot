import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../utils/storage'
import { users } from '../utils/users'
import '../styles/Login.css'

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
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      if (password !== confirmPassword) throw new Error('Passwords do not match')

      const exists = users.find(u => u.username === username.trim())
      if (exists) throw new Error('Username already taken. Please choose another.')

      await new Promise(resolve => setTimeout(resolve, 800))

      const newUser = {
        id: users.length + 1,
        username: username.trim(),
        password: password,
        email: '',
        fullName: fullName.trim()
      }
      users.push(newUser)

      loginUser(newUser.username, newUser.fullName)
      onLogin()
      navigate('/home')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
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
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ paddingRight: '60px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#27ae60',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
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
                style={{ paddingRight: '60px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#27ae60',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '6px' }}>
                Passwords do not match
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p style={{ color: '#27ae60', fontSize: '12px', marginTop: '6px' }}>
                Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
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
            <span className="feature-icon">🌬</span>
            <p>Wellness Tools</p>
          </div>
        </div>

      </div>
      <div className="login-bg-decoration"></div>
    </div>
  )
}