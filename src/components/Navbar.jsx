import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/storage'
import { logoutUser } from '../utils/users'

export default function Navbar({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const username = getCurrentUser()

  const isActive = (path) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/')
  }

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (!confirmed) return
    await logoutUser()
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0, cursor: 'pointer' }}>🌿 Kumusta AI</h1>
      </Link>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link
          to="/home"
          style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', color: 'white', transition: 'all 0.2s ease', background: isActive('/home') ? 'rgba(255,255,255,0.25)' : 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = isActive('/home') ? 'rgba(255,255,255,0.25)' : 'transparent'}
        >
          Home
        </Link>

        <Link
          to="/chatbot"
          style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', color: 'white', transition: 'all 0.2s ease', background: isActive('/chatbot') ? 'rgba(255,255,255,0.25)' : 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = isActive('/chatbot') ? 'rgba(255,255,255,0.25)' : 'transparent'}
        >
          Chatbot
        </Link>

        <Link
          to="/progress"
          style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', color: 'white', transition: 'all 0.2s ease', background: isActive('/progress') ? 'rgba(255,255,255,0.25)' : 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = isActive('/progress') ? 'rgba(255,255,255,0.25)' : 'transparent'}
        >
          Progress
        </Link>

        {username && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '16px', borderLeft: '1px solid rgba(255,255,255,0.3)', marginLeft: '8px' }}>
            <span style={{ fontSize: '14px', color: 'white', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                👤
              </span>
              {username}
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: '7px 16px',
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.5)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                boxShadow: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.borderColor = 'white'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}