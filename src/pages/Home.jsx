import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">

      {/* HERO SECTION */}
      <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Welcome to Kumusta AI</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#666', maxWidth: '480px', margin: '0 auto 28px' }}>
          Your personal mental health companion. Here to listen, support, and help you through your emotional journey.
        </p>
        <Link to="/chatbot">
          <button style={{ padding: '14px 36px', fontSize: '16px' }}>Start Chatting</button>
        </Link>
      </div>

      {/* FEATURES SECTION */}
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>What We Offer</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>AI Chat Support</h4>
            <p>Talk to our AI anytime about what's on your mind.</p>
          </div>
          <div className="stat-card">
            <h4>Mood Tracking</h4>
            <p>Monitor your emotional patterns and understand your feelings better.</p>
          </div>
          <div className="stat-card">
            <h4>Progress View</h4>
            <p>Visualize your mental health journey over time.</p>
          </div>
          <div className="stat-card">
            <h4>Breathing Exercises</h4>
            <p>Calming techniques to reduce stress and anxiety instantly.</p>
          </div>
          <div className="stat-card">
            <h4>Daily Tips</h4>
            <p>Personalized wellness suggestions based on your mood.</p>
          </div>
          <div className="stat-card">
            <h4>Streak Counter</h4>
            <p>Build consistency with daily check-ins.</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>How to Get Started</h3>
        <ol style={{ fontSize: '15px', lineHeight: '2.2', color: '#555', paddingLeft: '20px' }}>
          <li><strong>Share Your Mood</strong> — Select your current emotional state</li>
          <li><strong>Chat with Me</strong> — Tell me what's on your mind</li>
          <li><strong>Get Support</strong> — Receive personalized coping strategies</li>
          <li><strong>Use Tools</strong> — Try breathing exercises and wellness activities</li>
          <li><strong>Track Progress</strong> — View your journey and celebrate improvements</li>
        </ol>
      </div>

      {/* CTA SECTION */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h3>Ready to feel better?</h3>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>
          Take the first step towards better mental health today.
        </p>
        <Link to="/chatbot">
          <button style={{ padding: '14px 36px', fontSize: '16px' }}>Open Chatbot</button>
        </Link>
      </div>

    </div>
  )
}