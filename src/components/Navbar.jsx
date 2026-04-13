import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/storage'

export default function Navbar({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const user = getCurrentUser()

  const isActive = (path) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/')
  }

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (!confirmed) return
    logoutUser()
    onLogout()
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0, cursor: 'pointer' }}>🌿 Kumusta AI</h1>
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link
          to="/home"
          style={{
            textDecoration: 'none',
            borderBottom: isActive('/home') ? '2px solid #27ae60' : 'none'
          }}
        >
          Home
        </Link>
        <Link
          to="/chatbot"
          style={{
            textDecoration: 'none',
            borderBottom: isActive('/chatbot') ? '2px solid #27ae60' : 'none'
          }}
        >
          Chatbot
        </Link>
        <Link
          to="/progress"
          style={{
            textDecoration: 'none',
            borderBottom: isActive('/progress') ? '2px solid #27ae60' : 'none'
          }}
        >
          Progress
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingLeft: '20px',
          borderLeft: '1px solid #ecf0f1'
        }}>
          <span style={{ fontSize: '14px', color: '#555' }}>
            👤 {user?.fullName || user?.username || 'User'}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#c0392b'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#e74c3c'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}