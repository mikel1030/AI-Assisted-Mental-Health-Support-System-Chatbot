import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './style.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Progress from './pages/Progress'
import Login from './pages/Login'
import Register from './pages/Register'
import { auth } from './utils/firebase'
import { clearCurrentUserLocally } from './utils/storage'

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        clearCurrentUserLocally()
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f8f9fa',
        fontSize: '18px',
        color: '#27ae60'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div style={{ paddingTop: isAuthenticated ? '70px' : '0' }}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={() => setIsAuthenticated(true)} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Register onLogin={() => setIsAuthenticated(true)} />
          } />
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/home" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chatbot />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Progress />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}