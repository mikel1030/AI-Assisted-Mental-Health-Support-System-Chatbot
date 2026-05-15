import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  const [assessment, setAssessment] = useState(null)

  useEffect(() => {
    const lastAssessment = localStorage.getItem('lastAssessment')
    if (lastAssessment) {
      setAssessment(JSON.parse(lastAssessment))
    }
  }, [])

  const getWelcomeMessage = () => {
    if (!assessment) return 'Welcome to Kumusta AI'
    
    const level = assessment.assessmentLevel
    const messages = {
      'Critical': `We're here for you during this difficult time, ${level.emoji}`,
      'Severe': `Let's work through this together, ${level.emoji}`,
      'Moderate': `We're here to support you, ${level.emoji}`,
      'Mild': `Great to see you doing okay, ${level.emoji}`,
      'Good': `You're in a good place, ${level.emoji}`,
      'Excellent': `Keep shining bright, ${level.emoji}`
    }
    return messages[level.name] || 'Welcome back to Kumusta AI'
  }

  return (
    <div className="container">

      {/* HERO SECTION WITH ASSESSMENT */}
      <div className="card" style={{ 
        textAlign: 'center', 
        padding: '56px 40px', 
        background: assessment ? `linear-gradient(135deg, rgba(248, 252, 249, 0.8) 0%, rgba(232, 245, 233, 0.8) 100%)` : 'white',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          {getWelcomeMessage()}
        </h2>
        {assessment && (
          <div style={{ 
            marginBottom: '24px', 
            padding: '20px', 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            borderRadius: '14px', 
            maxWidth: '520px', 
            margin: '0 auto 24px',
            border: '1px solid rgba(200, 240, 218, 0.5)',
            boxShadow: '0 4px 12px rgba(39, 174, 96, 0.1)'
          }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', fontWeight: '500' }}>
              <strong>Your Assessment Status:</strong>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '14px' }}>
              <span style={{ fontSize: '40px' }}>{assessment.assessmentLevel.emoji}</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '18px', fontWeight: '700', color: assessment.assessmentLevel.color, margin: '0' }}>
                  {assessment.assessmentLevel.name}
                </p>
                <p style={{ fontSize: '14px', color: '#666', margin: '4px 0 0 0', fontWeight: '500' }}>
                  Overall Score: <strong>{assessment.overallScore}/5.0</strong>
                </p>
              </div>
            </div>
            <a href="/assessment" style={{ fontSize: '13px', color: '#27ae60', textDecoration: 'none', fontWeight: '700', letterSpacing: '0.2px' }}>
              Retake Assessment →
            </a>
          </div>
        )}
        <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#555', maxWidth: '520px', margin: '0 auto 32px', fontWeight: '500' }}>
          Your personal mental health companion. Here to listen, support, and help you through your emotional journey.
        </p>
        <a href="/chatbot">
          <button style={{ padding: '16px 40px', fontSize: '16px', fontWeight: '700' }}>Start Chatting</button>
        </a>
      </div>

      {/* HOW IT WORKS */}
      <div className="card">
        <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>How to Get Started</h3>
        <ol style={{ fontSize: '16px', lineHeight: '2.4', color: '#555', paddingLeft: '24px', margin: '0' }}>
          <li><strong style={{ color: '#27ae60' }}>Share Your Mood</strong> — Select your current emotional state</li>
          <li><strong style={{ color: '#27ae60' }}>Chat with Me</strong> — Tell me what's on your mind</li>
          <li><strong style={{ color: '#27ae60' }}>Get Support</strong> — Receive personalized coping strategies</li>
          <li><strong style={{ color: '#27ae60' }}>Use Tools</strong> — Try breathing exercises and wellness activities</li>
          <li><strong style={{ color: '#27ae60' }}>Track Progress</strong> — View your journey and celebrate improvements</li>
        </ol>
      </div>

      {/* CTA SECTION */}
      <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(248, 252, 249, 0.8) 0%, rgba(232, 245, 233, 0.8) 100%)' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Ready to feel better?</h3>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '28px', fontWeight: '500' }}>
          Take the first step towards better mental health today.
        </p>
        <a href="/chatbot">
          <button style={{ padding: '16px 40px', fontSize: '16px', fontWeight: '700' }}>Open Chatbot →</button>
        </a>
      </div>

    </div>
  )
}