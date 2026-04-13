import { useState, useEffect, useRef } from 'react'
import { moodData, inspirationalQuotes, breathingExercises } from '../utils/data'
import { addMoodToStorage, updateStreakInStorage, getStreakFromStorage, getMoodsFromStorage } from '../utils/storage'

const avatars = [
  {
    id: 'girl',
    name: 'Ate Maya',
    description: 'Warm and nurturing',
    svg: (
      <svg viewBox="0 0 100 100" width="80" height="80">
        <circle cx="50" cy="50" r="48" fill="#fce4ec" stroke="#f48fb1" strokeWidth="2"/>
        <circle cx="50" cy="38" r="18" fill="#ffccbc"/>
        <ellipse cx="50" cy="80" rx="22" ry="16" fill="#f06292"/>
        <path d="M32 38 Q30 20 50 18 Q70 20 68 38" fill="#6d4c41"/>
        <path d="M28 35 Q24 18 50 16 Q76 18 72 35" fill="#5d4037"/>
        <circle cx="43" cy="38" r="3" fill="#5d4037"/>
        <circle cx="57" cy="38" r="3" fill="#5d4037"/>
        <circle cx="44" cy="37" r="1" fill="white"/>
        <circle cx="58" cy="37" r="1" fill="white"/>
        <path d="M44 46 Q50 50 56 46" stroke="#e91e63" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="42" cy="43" rx="4" ry="2" fill="#ffab91" opacity="0.6"/>
        <ellipse cx="58" cy="43" rx="4" ry="2" fill="#ffab91" opacity="0.6"/>
        <path d="M28 60 Q22 55 26 72 Q32 68 36 65" fill="#f06292"/>
        <path d="M72 60 Q78 55 74 72 Q68 68 64 65" fill="#f06292"/>
      </svg>
    )
  },
  {
    id: 'boy',
    name: 'Kuya Chief',
    description: 'Calm and grounded',
    svg: (
      <svg viewBox="0 0 100 100" width="80" height="80">
        <circle cx="50" cy="50" r="48" fill="#e3f2fd" stroke="#90caf9" strokeWidth="2"/>
        <circle cx="50" cy="38" r="18" fill="#ffccbc"/>
        <ellipse cx="50" cy="80" rx="22" ry="16" fill="#1565c0"/>
        <path d="M32 30 Q32 18 50 17 Q68 18 68 30 Q68 22 50 20 Q32 22 32 30" fill="#4e342e"/>
        <circle cx="43" cy="38" r="3" fill="#4e342e"/>
        <circle cx="57" cy="38" r="3" fill="#4e342e"/>
        <circle cx="44" cy="37" r="1" fill="white"/>
        <circle cx="58" cy="37" r="1" fill="white"/>
        <path d="M45 46 Q50 49 55 46" stroke="#e57373" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M33 34 Q32 30 38 31" stroke="#4e342e" strokeWidth="2" fill="none"/>
        <path d="M67 34 Q68 30 62 31" stroke="#4e342e" strokeWidth="2" fill="none"/>
        <path d="M28 62 Q22 56 27 72 Q33 68 37 64" fill="#1565c0"/>
        <path d="M72 62 Q78 56 73 72 Q67 68 63 64" fill="#1565c0"/>
      </svg>
    )
  },
  {
    id: 'robot',
    name: 'Mochi',
    description: 'Friendly and fun',
    svg: (
      <svg viewBox="0 0 100 100" width="80" height="80">
        <circle cx="50" cy="50" r="48" fill="#e8f5e9" stroke="#a5d6a7" strokeWidth="2"/>
        <rect x="28" y="28" width="44" height="38" rx="10" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
        <rect x="34" y="34" width="13" height="10" rx="4" fill="white" stroke="#80cbc4" strokeWidth="1"/>
        <rect x="53" y="34" width="13" height="10" rx="4" fill="white" stroke="#80cbc4" strokeWidth="1"/>
        <circle cx="40" cy="39" r="4" fill="#26c6da"/>
        <circle cx="60" cy="39" r="4" fill="#26c6da"/>
        <circle cx="41" cy="38" r="1.5" fill="white"/>
        <circle cx="61" cy="38" r="1.5" fill="white"/>
        <rect x="38" y="52" width="24" height="6" rx="3" fill="#80cbc4"/>
        <rect x="42" y="53" width="4" height="4" rx="1" fill="white"/>
        <rect x="48" y="53" width="4" height="4" rx="1" fill="white"/>
        <rect x="54" y="53" width="4" height="4" rx="1" fill="white"/>
        <rect x="44" y="20" width="12" height="10" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
        <circle cx="50" cy="20" r="3" fill="#26c6da"/>
        <rect x="22" y="36" width="8" height="20" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
        <rect x="70" y="36" width="8" height="20" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
        <rect x="34" y="64" width="10" height="14" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
        <rect x="56" y="64" width="10" height="14" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1.5"/>
      </svg>
    )
  }
]

function TwEmoji({ emoji, size = 24 }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current && window.twemoji) {
      window.twemoji.parse(ref.current, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/'
      })
    }
  }, [emoji])
  return (
    <span
      ref={ref}
      style={{ display: 'inline-flex', alignItems: 'center' }}
      className={`twemoji-size-${size}`}
    >
      {emoji}
    </span>
  )
}

export default function Chatbot() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streak, setStreak] = useState(getStreakFromStorage())
  const [moodCount, setMoodCount] = useState(getMoodsFromStorage().length)
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingText, setBreathingText] = useState('Choose an exercise to start')
  const chatBoxRef = useRef(null)
  const breathingIntervalRef = useRef(null)

  useEffect(() => {
    if (window.twemoji) {
      window.twemoji.parse(document.body, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/'
      })
    }
  }, [messages, confirmed])

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
      }
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleConfirmAvatar = () => {
    if (!selectedAvatar) return
    setConfirmed(true)
    const avatar = avatars.find(a => a.id === selectedAvatar)
    setMessages([{
      type: 'bot',
      text: `Hi! I'm ${avatar.name}. Kumusta ka? 💚 I'm here to listen and support you. How are you feeling today?`
    }])
  }

  const getSmartResponse = (input) => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('kamusta') || lowerInput.includes('kumusta')) {
      return "Hello! Kumusta ka? How are you doing today? 💚"
    } else if (lowerInput.includes('help')) {
      return "I'm here to help. Tell me what's on your mind. 🤝"
    } else if (lowerInput.includes('thank') || lowerInput.includes('salamat')) {
      return "You're welcome! Lagi akong nandito para sa'yo. 💚"
    } else if (lowerInput.includes('exercise') || lowerInput.includes('breathing')) {
      return "Breathing exercises are great! Try starting one below. They really help calm the mind. 🌬️"
    } else {
      const responses = [
        "That sounds important. Tell me more about how you're feeling. 💭",
        "I understand. What would help you feel better right now? 🌱",
        "Thank you for sharing that with me. How can I support you? 💚",
        "I hear you. You're not alone in this. 🤗",
        "Nandito lang ako para sa'yo. Keep going, kaya mo 'yan! 💪"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const handleSendMessage = (overrideInput) => {
    const text = overrideInput || input
    if (text.trim() === '') return
    setMessages(prev => [...prev, { type: 'user', text }])
    setInput('')
    setMessages(prev => [...prev, { type: 'typing', text: '' }])
    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(m => m.type !== 'typing')
        return [...filtered, { type: 'bot', text: getSmartResponse(text) }]
      })
    }, 1500)
  }

  const handleSetMood = (mood) => {
    setMessages(prev => [...prev, { type: 'user', text: `I'm feeling ${mood}` }])
    addMoodToStorage(mood)
    updateStreakInStorage()
    setStreak(getStreakFromStorage())
    setMoodCount(getMoodsFromStorage().length)
    const data = moodData[mood]
    const activitiesText = data.activities.map(a => '• ' + a).join('\n')
    const responseText = `${data.response}\n\nSuggestions for you:\n${activitiesText}\n\n"${data.quote}"`
    setMessages(prev => [...prev, { type: 'bot', text: responseText }])
  }

  const startBreathing = (type) => {
    if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current)
    const exercise = breathingExercises[type]
    let stepIndex = 0
    setBreathingActive(true)
    setBreathingText(exercise.steps[stepIndex])
    breathingIntervalRef.current = setInterval(() => {
      stepIndex = (stepIndex + 1) % exercise.steps.length
      setBreathingText(exercise.steps[stepIndex])
    }, exercise.durations[stepIndex % exercise.durations.length])
  }

  const stopBreathing = () => {
    if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current)
    setBreathingActive(false)
    setBreathingText('Stopped. Great job!')
  }

  if (!confirmed) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <h2 style={{ marginBottom: '8px' }}>Choose Your Companion</h2>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Pick a companion you're most comfortable talking to
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {avatars.map(avatar => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                style={{
                  cursor: 'pointer',
                  padding: '24px 20px',
                  borderRadius: '16px',
                  border: selectedAvatar === avatar.id ? '2px solid #27ae60' : '2px solid #e0e0e0',
                  background: selectedAvatar === avatar.id ? '#f0faf4' : 'white',
                  width: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                  transform: selectedAvatar === avatar.id ? 'translateY(-4px)' : 'none',
                  boxShadow: selectedAvatar === avatar.id ? '0 6px 20px rgba(39,174,96,0.15)' : 'none'
                }}
              >
                {avatar.svg}
                <p style={{ fontWeight: '600', fontSize: '14px', margin: 0, color: selectedAvatar === avatar.id ? '#27ae60' : '#333' }}>
                  {avatar.name}
                </p>
                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>{avatar.description}</p>
                {selectedAvatar === avatar.id && (
                  <span style={{ fontSize: '11px', background: '#27ae60', color: 'white', padding: '2px 10px', borderRadius: '20px' }}>
                    Selected
                  </span>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleConfirmAvatar}
            disabled={!selectedAvatar}
            style={{
              padding: '14px 48px',
              fontSize: '15px',
              background: selectedAvatar ? undefined : '#ccc',
              cursor: selectedAvatar ? 'pointer' : 'not-allowed',
              boxShadow: selectedAvatar ? undefined : 'none'
            }}
          >
            Start Chatting
          </button>
        </div>
      </div>
    )
  }

  const currentAvatar = avatars.find(a => a.id === selectedAvatar)

  return (
    <div className="container">

      {/* AVATAR HEADER */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
        <div style={{ flexShrink: 0 }}>{currentAvatar.svg}</div>
        <div>
          <p style={{ fontWeight: '600', fontSize: '16px', margin: 0, color: '#27ae60' }}>{currentAvatar.name}</p>
          <p style={{ fontSize: '13px', color: '#888', margin: '2px 0 8px' }}>{currentAvatar.description}</p>
          <button
            onClick={() => { setConfirmed(false); setSelectedAvatar(null) }}
            style={{ fontSize: '12px', background: 'none', border: '1px solid #ccc', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', color: '#666', boxShadow: 'none' }}
          >
            Change companion
          </button>
        </div>
      </div>

      {/* STREAK TRACKER */}
      <div className="card">
        <h4><TwEmoji emoji="🔥" size={18} /> Your Streak</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Current Streak</h4>
            <div className="number">{streak}</div>
            <p>Days checking in</p>
          </div>
          <div className="stat-card">
            <h4>Moods Logged</h4>
            <div className="number">{moodCount}</div>
            <p>Total entries</p>
          </div>
        </div>
        <div className="quote-box">"{inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]}"</div>
      </div>

      {/* MOOD SELECTOR */}
      <div className="card">
        <h3>How are you feeling today?</h3>
        <div className="mood">
          <button onClick={() => handleSetMood('Happy')}><TwEmoji emoji="😊" size={32} /></button>
          <button onClick={() => handleSetMood('Sad')}><TwEmoji emoji="😢" size={32} /></button>
          <button onClick={() => handleSetMood('Anxious')}><TwEmoji emoji="😰" size={32} /></button>
          <button onClick={() => handleSetMood('Stressed')}><TwEmoji emoji="😣" size={32} /></button>
        </div>
      </div>

      {/* CHAT SECTION */}
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: 32, height: 32, display: 'inline-flex' }}>{currentAvatar.svg}</span>
          Chat with {currentAvatar.name}
        </h3>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            msg.type === 'typing' ? (
              <div key={idx} className="message bot typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            ) : (
              <div key={idx} className={`message ${msg.type}`} style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>
            )
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={() => handleSendMessage()}>Send</button>
        </div>
        <div className="quick-responses">
          <button onClick={() => handleSendMessage('I need help')}>Need Help</button>
          <button onClick={() => handleSendMessage('Tell me something positive')}>Inspire Me</button>
          <button onClick={() => handleSendMessage('How to manage stress?')}>Stress Tips</button>
        </div>
      </div>

      {/* BREATHING EXERCISES */}
      <div className="card">
        <h3><TwEmoji emoji="🌬️" size={20} /> Breathing Exercises</h3>
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
          {breathingText}
        </p>
        <div className="breathing-options">
          <button onClick={() => startBreathing('basic')}>Basic Breathing</button>
          <button onClick={() => startBreathing('boxBreathing')}>Box Breathing</button>
          <button onClick={() => startBreathing('478')}>4-7-8 Technique</button>
          <button onClick={stopBreathing}>Stop</button>
        </div>
      </div>

      {/* QUICK TIPS */}
      <div className="card">
        <h3><TwEmoji emoji="💡" size={20} /> Quick Tips</h3>
        <ul style={{ lineHeight: '2', fontSize: '15px' }}>
          <li><TwEmoji emoji="✅" size={16} /> Stay hydrated - Drink water throughout the day</li>
          <li><TwEmoji emoji="✅" size={16} /> Move your body - Even a 5-minute walk helps</li>
          <li><TwEmoji emoji="✅" size={16} /> Practice gratitude - Write 3 things you're grateful for</li>
          <li><TwEmoji emoji="✅" size={16} /> Connect - Reach out to someone you care about</li>
          <li><TwEmoji emoji="✅" size={16} /> Rest - Prioritize quality sleep</li>
        </ul>
      </div>

    </div>
  )
}