import { useState, useEffect, useRef } from 'react'
import { moodData, inspirationalQuotes, breathingExercises } from '../utils/data'
import { addMoodToStorage, updateStreakInStorage, getStreakFromStorage, getMoodsFromStorage, getCurrentUser } from '../utils/storage'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const HISTORY_KEY = 'kumusta_chat_history'

function saveChatSession(avatarId, avatarName, messages) {
  if (!messages || messages.length <= 1) return
  const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  const session = {
    id: Date.now(),
    avatarId,
    avatarName,
    preview: messages.find(m => m.type === 'user')?.text || 'Chat session',
    messages,
    date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  existing.unshift(session)
  // Keep max 30 sessions
  localStorage.setItem(HISTORY_KEY, JSON.stringify(existing.slice(0, 30)))
}

function getChatHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
}

function deleteChatSession(id) {
  const existing = getChatHistory()
  localStorage.setItem(HISTORY_KEY, JSON.stringify(existing.filter(s => s.id !== id)))
}

const avatars = [
  {
    id: 'girl',
    name: 'Ate Maya',
    description: 'Warm and nurturing',
    personality: 'You are Ate Maya, a warm and nurturing older sister figure. You speak in a mix of Filipino and English (Taglish). You are caring, gentle, and always encouraging.',
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
    personality: 'You are Kuya Chief, a calm and grounded older brother figure. You speak in a mix of Filipino and English (Taglish). You are practical, steady, and reassuring.',
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
    personality: 'You are Mochi, a friendly and fun AI companion. You speak in a mix of Filipino and English (Taglish). You are upbeat, creative, and always positive.',
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
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center' }} className={`twemoji-size-${size}`}>
      {emoji}
    </span>
  )
}

// --- History Panel ---
function HistoryPanel({ isOpen, onClose, onRestoreSession }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (isOpen) setHistory(getChatHistory())
  }, [isOpen])

  const handleDelete = (id) => {
    deleteChatSession(id)
    setHistory(getChatHistory())
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
            zIndex: 99, transition: 'opacity 0.2s'
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '320px', maxWidth: '90vw',
        background: 'white', zIndex: 100,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <p style={{ fontWeight: '600', fontSize: '16px', margin: 0, color: '#27ae60' }}>Chat History</p>
            <p style={{ fontSize: '12px', color: '#999', margin: '2px 0 0' }}>
              {history.length} saved {history.length === 1 ? 'conversation' : 'conversations'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '20px', color: '#999', padding: '4px 8px',
              borderRadius: '6px', lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        {/* Sessions list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#bbb' }}>
              <p style={{ fontSize: '32px', margin: '0 0 12px' }}>💬</p>
              <p style={{ fontSize: '14px', margin: 0 }}>No saved conversations yet.</p>
              <p style={{ fontSize: '12px', margin: '4px 0 0', color: '#ccc' }}>
                Conversations are saved when you switch companions or reload.
              </p>
            </div>
          ) : (
            history.map(session => (
              <div
                key={session.id}
                style={{
                  border: '1px solid #f0f0f0',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                  background: '#fafafa'
                }}
              >
                {/* Session header — clickable to restore */}
                <div
                  onClick={() => { onRestoreSession(session); onClose() }}
                  style={{
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex', gap: '10px', alignItems: 'flex-start'
                  }}
                >
                  {/* Mini avatar dot */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: session.avatarId === 'girl' ? '#fce4ec'
                      : session.avatarId === 'boy' ? '#e3f2fd' : '#e8f5e9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px'
                  }}>
                    {session.avatarId === 'girl' ? '👩' : session.avatarId === 'boy' ? '👨' : '🤖'}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: '600', fontSize: '13px', margin: 0, color: '#27ae60' }}>
                      {session.avatarName}
                    </p>
                    <p style={{
                      fontSize: '12px', color: '#666', margin: '2px 0 0',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {session.preview}
                    </p>
                    <p style={{ fontSize: '11px', color: '#bbb', margin: '4px 0 0' }}>
                      {session.date} · {session.messages.filter(m => m.type === 'user').length} messages
                    </p>
                  </div>
                </div>

                {/* Message preview (collapsed) */}
                <SessionPreview messages={session.messages} />

                {/* Actions */}
                <div style={{
                  padding: '8px 14px',
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex', gap: '8px'
                }}>
                  <button
                    onClick={() => { onRestoreSession(session); onClose() }}
                    style={{
                      flex: 1, fontSize: '12px', padding: '6px 0',
                      background: '#f0faf4', color: '#27ae60',
                      border: '1px solid #c8f0da', borderRadius: '6px',
                      cursor: 'pointer', fontWeight: '600', boxShadow: 'none'
                    }}
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    style={{
                      fontSize: '12px', padding: '6px 12px',
                      background: 'none', color: '#e57373',
                      border: '1px solid #ffcdd2', borderRadius: '6px',
                      cursor: 'pointer', boxShadow: 'none'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

function SessionPreview({ messages }) {
  const [expanded, setExpanded] = useState(false)
  const visible = messages.filter(m => m.type === 'user' || m.type === 'bot')
  const preview = expanded ? visible : visible.slice(0, 3)

  return (
    <div style={{ padding: '0 14px 8px', borderTop: '1px solid #f5f5f5' }}>
      {preview.map((msg, i) => (
        <div key={i} style={{
          fontSize: '11px',
          color: msg.type === 'user' ? '#555' : '#27ae60',
          padding: '3px 0',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          <span style={{ fontWeight: '600', marginRight: 4 }}>
            {msg.type === 'user' ? 'You:' : 'AI:'}
          </span>
          {msg.text?.split('\n')[0]}
        </div>
      ))}
      {visible.length > 3 && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            fontSize: '11px', color: '#aaa', background: 'none', border: 'none',
            cursor: 'pointer', padding: '2px 0', boxShadow: 'none'
          }}
        >
          {expanded ? '▲ Show less' : `▼ Show ${visible.length - 3} more`}
        </button>
      )}
    </div>
  )
}

// --- Main Chatbot ---
export default function Chatbot() {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
const [streak, setStreak] = useState(0)
const [moodCount, setMoodCount] = useState(0)

useEffect(() => {
  const loadStats = async () => {
    const s = await getStreakFromStorage()
    const moods = await getMoodsFromStorage()
    setStreak(s)
    setMoodCount(moods.length)
  }
  loadStats()
}, [])
  const [breathingText, setBreathingText] = useState('Choose an exercise to start')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const chatBoxRef = useRef(null)
  const breathingIntervalRef = useRef(null)
  const conversationHistoryRef = useRef([])

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (window.twemoji && confirmed) {
      window.twemoji.parse(document.body, {
        folder: 'svg', ext: '.svg',
        base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/'
      })
    }
  }, [messages, confirmed])

  const handleConfirmAvatar = () => {
    if (!selectedAvatar) return
    setConfirmed(true)
    conversationHistoryRef.current = []
    const avatar = avatars.find(a => a.id === selectedAvatar)
    const greeting = `Hi! I'm ${avatar.name}. Kumusta ka? I'm here to listen and support you. How are you feeling today?`
    setMessages([{ type: 'bot', text: greeting }])
  }

  // Save current session when switching companions
  const handleChangeCompanion = () => {
    if (selectedAvatar && messages.length > 1) {
      const avatar = avatars.find(a => a.id === selectedAvatar)
      saveChatSession(selectedAvatar, avatar.name, messages)
    }
    setConfirmed(false)
    setSelectedAvatar(null)
    setMessages([])
    conversationHistoryRef.current = []
  }

  // Restore a session from history
  const handleRestoreSession = (session) => {
    const avatar = avatars.find(a => a.id === session.avatarId)
    if (!avatar) return
    // Save current session first if active
    if (selectedAvatar && messages.length > 1) {
      const currentAvatar = avatars.find(a => a.id === selectedAvatar)
      saveChatSession(selectedAvatar, currentAvatar.name, messages)
    }
    setSelectedAvatar(session.avatarId)
    setConfirmed(true)
    setMessages(session.messages)
    // Rebuild conversation history for AI context (last 20 user/bot messages)
    const rebuilt = session.messages
      .filter(m => m.type === 'user' || m.type === 'bot')
      .slice(-20)
      .map(m => ({ role: m.type === 'user' ? 'user' : 'model', text: m.text }))
    conversationHistoryRef.current = rebuilt
  }

  const getAIResponse = async (userMessage, avatarPersonality) => {
    const username = getCurrentUser() || 'friend'

    const systemPrompt = `${avatarPersonality}

You are a mental health support companion for Filipino users of the Kumusta AI app.
The user's name is ${username}.

YOUR SCOPE — you may ONLY respond to topics related to:
- Emotions and feelings (sadness, anxiety, stress, loneliness, anger, happiness, etc.)
- Mental health concerns (depression, anxiety disorders, burnout, grief, trauma, low self-esteem, etc.)
- Coping strategies and self-care tips
- Motivation, encouragement, and emotional support
- Breathing, relaxation, and mindfulness techniques
- Relationships and personal struggles that affect mental well-being
- Crisis support (self-harm, suicidal thoughts — always refer to NCMH hotline 1553)

OUT OF SCOPE — if the user asks about anything NOT related to mental health or emotional well-being (such as math, coding, science, news, recipes, general trivia, homework, or any other unrelated topic), you must politely decline in Taglish and redirect them back to mental health topics. Use this kind of response: "Sorry, hindi ko masasagot yan — ako kasi ay espesyal na trained para sa mental health support lang. May nararamdaman ka ba na gusto mong pag-usapan?"

Important guidelines:
- Always respond in Taglish (mix of Tagalog and English) naturally
- Be empathetic, non-judgmental, and supportive
- Keep responses concise — 2 to 4 sentences max
- Use Filipino expressions like "Nandito ako para sa'yo", "Kaya mo yan", "Ikaw ay hindi nag-iisa"
- Never give medical diagnoses
- Do NOT use any emojis in your responses
- Write naturally like a real person texting
- Address the user by their name occasionally`

    const history = conversationHistoryRef.current.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.text
    }))

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: userMessage }
          ],
          max_tokens: 200,
          temperature: 0.8
        })
      })

      const data = await response.json()

      if (data?.choices?.[0]?.message?.content) {
        return data.choices[0].message.content
      } else {
        throw new Error('No response from Groq')
      }
    } catch (error) {
      console.error('Groq API error:', error)
      const fallbacks = [
        "Nandito ako para sa'yo. Pwede mo akong sabihin ang lahat.",
        "I hear you. Hindi ka nag-iisa sa iyong nararamdaman.",
        "Salamat sa pagbabahagi. Kaya mo yan, nandito lang ako.",
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    }
  }

  const handleSendMessage = async (overrideInput) => {
    const text = (overrideInput || input).trim()
    if (!text || isAiLoading) return

    const avatar = avatars.find(a => a.id === selectedAvatar)

    setMessages(prev => [...prev, { type: 'user', text }])
    setInput('')
    setIsAiLoading(true)

    conversationHistoryRef.current.push({ role: 'user', text })

    setMessages(prev => [...prev, { type: 'typing', text: '' }])

    const aiResponse = await getAIResponse(text, avatar.personality)

    conversationHistoryRef.current.push({ role: 'model', text: aiResponse })

    if (conversationHistoryRef.current.length > 20) {
      conversationHistoryRef.current = conversationHistoryRef.current.slice(-20)
    }

    setMessages(prev => {
      const filtered = prev.filter(m => m.type !== 'typing')
      return [...filtered, { type: 'bot', text: aiResponse }]
    })
    setIsAiLoading(false)
  }

 const handleSetMood = async (mood) => {
  setMessages(prev => [...prev, { type: 'user', text: `I'm feeling ${mood}` }])
  await addMoodToStorage(mood)
  await updateStreakInStorage()
  const newStreak = await getStreakFromStorage()
  const moods = await getMoodsFromStorage()
  setStreak(newStreak)
  setMoodCount(moods.length)
  const data = moodData[mood]
  const activitiesText = data.activities.map(a => '• ' + a).join('\n')
  const responseText = `${data.response}\n\nSuggestions for you:\n${activitiesText}\n\n"${data.quote}"`
  setMessages(prev => [...prev, { type: 'bot', text: responseText }])
}
  const startBreathing = (type) => {
    if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current)
    const exercise = breathingExercises[type]
    let stepIndex = 0
    setBreathingText(exercise.steps[stepIndex])
    breathingIntervalRef.current = setInterval(() => {
      stepIndex = (stepIndex + 1) % exercise.steps.length
      setBreathingText(exercise.steps[stepIndex])
    }, exercise.durations[stepIndex % exercise.durations.length])
  }

  const stopBreathing = () => {
    if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current)
    setBreathingText('Stopped. Great job!')
  }

  if (!confirmed) {
    return (
      <>
        <HistoryPanel
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
          onRestoreSession={handleRestoreSession}
        />
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            {/* History button on avatar select screen */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button
                onClick={() => setHistoryOpen(true)}
                style={{
                  fontSize: '13px', background: '#f0faf4', color: '#27ae60',
                  border: '1px solid #c8f0da', borderRadius: '8px',
                  padding: '6px 14px', cursor: 'pointer', boxShadow: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                🕐 History
              </button>
            </div>

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
      </>
    )
  }

  const currentAvatar = avatars.find(a => a.id === selectedAvatar)

  return (
    <>
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onRestoreSession={handleRestoreSession}
      />

      <div className="container">

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
          <div style={{ flexShrink: 0 }}>{currentAvatar.svg}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: '600', fontSize: '16px', margin: 0, color: '#27ae60' }}>{currentAvatar.name}</p>
            <p style={{ fontSize: '13px', color: '#888', margin: '2px 0 8px' }}>{currentAvatar.description}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleChangeCompanion}
                style={{ fontSize: '12px', background: 'none', border: '1px solid #ccc', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', color: '#666', boxShadow: 'none' }}
              >
                Change companion
              </button>
              <button
                onClick={() => setHistoryOpen(true)}
                style={{
                  fontSize: '12px', background: '#f0faf4', color: '#27ae60',
                  border: '1px solid #c8f0da', borderRadius: '6px',
                  padding: '4px 12px', cursor: 'pointer', boxShadow: 'none'
                }}
              >
                🕐 History
              </button>
            </div>
          </div>
        </div>

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

        <div className="card">
          <h3>How are you feeling today?</h3>
          <div className="mood">
            <button onClick={() => handleSetMood('Happy')}><TwEmoji emoji="😊" size={32} /></button>
            <button onClick={() => handleSetMood('Sad')}><TwEmoji emoji="😢" size={32} /></button>
            <button onClick={() => handleSetMood('Anxious')}><TwEmoji emoji="😰" size={32} /></button>
            <button onClick={() => handleSetMood('Stressed')}><TwEmoji emoji="😣" size={32} /></button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{
              width: 36, height: 36, display: 'inline-flex', flexShrink: 0,
              overflow: 'hidden', borderRadius: '50%', border: '2px solid #c8f0da'
            }}>
              <svg viewBox="0 0 100 100" width="36" height="36">
                {currentAvatar.svg.props.children}
              </svg>
            </span>
            Chat with {currentAvatar.name}
            <span style={{
              marginLeft: 'auto', fontSize: '11px', background: '#f0faf4',
              color: '#27ae60', padding: '3px 10px', borderRadius: '20px',
              border: '1px solid #c8f0da', fontWeight: '600'
            }}>
              AI Powered
            </span>
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
              placeholder={isAiLoading ? 'Waiting for response...' : 'Share your thoughts...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAiLoading && handleSendMessage()}
              disabled={isAiLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isAiLoading}
              style={{ opacity: isAiLoading ? 0.6 : 1, cursor: isAiLoading ? 'not-allowed' : 'pointer' }}
            >
              {isAiLoading ? '...' : 'Send'}
            </button>
          </div>

          <div className="quick-responses">
            <button onClick={() => handleSendMessage('I need help')} disabled={isAiLoading}>Need Help</button>
            <button onClick={() => handleSendMessage('Tell me something positive')} disabled={isAiLoading}>Inspire Me</button>
            <button onClick={() => handleSendMessage('How to manage stress?')} disabled={isAiLoading}>Stress Tips</button>
          </div>
        </div>

        <div className="card">
          <h3>Breathing Exercises</h3>
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

      </div>
    </>
  )
}
