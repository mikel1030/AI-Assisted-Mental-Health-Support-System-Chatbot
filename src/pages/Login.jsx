import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../utils/storage'
import { authenticateUser } from '../utils/users'
import '../styles/Login.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!username.trim()) throw new Error('Username is required')
      if (!password) throw new Error('Password is required')

      await new Promise(resolve => setTimeout(resolve, 800))

      const authenticatedUser = authenticateUser(username, password)
      if (!authenticatedUser) throw new Error('Invalid username or password. Please try again.')

      loginUser(authenticatedUser.username, authenticatedUser.fullName)
      onLogin()
      navigate('/home')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
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

        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign In</h2>
          <p className="login-subtitle">Welcome back! Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
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
                placeholder="Enter your password"
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

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
          New user?{' '}
          <Link to="/register" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
            Create an account
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