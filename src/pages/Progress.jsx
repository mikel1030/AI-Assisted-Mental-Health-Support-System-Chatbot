import { useState, useEffect } from 'react'
import { getMoodsFromStorage, getStreakFromStorage, clearAllStorage } from '../utils/storage'
import { moodEmojis } from '../utils/data'

export default function Progress() {
  const [moods, setMoods] = useState(getMoodsFromStorage())
  const [streak, setStreak] = useState(getStreakFromStorage())
  const [moodCounts, setMoodCounts] = useState({})
  const [wellnessScore, setWellnessScore] = useState(0)

  useEffect(() => {
    const counts = {
      'Happy': 0,
      'Sad': 0,
      'Anxious': 0,
      'Stressed': 0
    }

    moods.forEach(m => {
      if (counts[m.mood] !== undefined) {
        counts[m.mood]++
      }
    })

    setMoodCounts(counts)

    // Calculate wellness score
    const total = moods.length || 1
    const score = Math.min(100, counts['Happy'] * 10 + streak * 5)
    setWellnessScore(score)
  }, [moods, streak])

  const handleClearData = () => {
    if (confirm('Are you sure? This will clear all your data.')) {
      clearAllStorage()
      setMoods([])
      setStreak(0)
      setMoodCounts({})
      setWellnessScore(0)
      alert('Data cleared!')
    }
  }

  const total = moods.length || 1
  const moodPercents = {
    'Happy': Math.round((moodCounts['Happy'] || 0 / total) * 100),
    'Sad': Math.round((moodCounts['Sad'] || 0 / total) * 100),
    'Anxious': Math.round((moodCounts['Anxious'] || 0 / total) * 100),
    'Stressed': Math.round((moodCounts['Stressed'] || 0 / total) * 100)
  }

  return (
    <div className="container">
      {/* PROGRESS OVERVIEW */}
      <div className="card">
        <h2>Your Mental Health Journey 💚</h2>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Track your mood trends and celebrate your progress towards better mental wellness.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="card">
        <h3>📊 Your Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>🔥 Streak Days</h4>
            <div className="number">{streak}</div>
            <p>Keep it going!</p>
          </div>
          <div className="stat-card">
            <h4>📝 Total Check-ins</h4>
            <div className="number">{moods.length}</div>
            <p>You're consistent</p>
          </div>
          <div className="stat-card">
            <h4>😊 Happy Days</h4>
            <div className="number">{moodCounts['Happy'] || 0}</div>
            <p>Celebrate joy</p>
          </div>
          <div className="stat-card">
            <h4>⚡ Streak Record</h4>
            <div className="number">{streak}</div>
            <p>Personal best</p>
          </div>
        </div>
      </div>

      {/* MOOD PROGRESS BAR */}
      <div className="card">
        <h3>Weekly Mood Improvement</h3>
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontWeight: 'bold', color: '#27ae60' }}>Overall Wellness Level</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${wellnessScore}%` }}></div>
          </div>
          <p style={{ textAlign: 'right', fontSize: '14px', color: '#999', marginTop: '10px' }}>
            {wellnessScore}%
          </p>
        </div>
      </div>

      {/* MOOD BREAKDOWN */}
      <div className="card">
        <h3>😊 Mood Distribution</h3>
        <div className="stats-grid" style={{ marginTop: '20px' }}>
          <div className="stat-card">
            <h4>😊 Happy</h4>
            <div className="number" style={{ fontSize: '28px' }}>
              {Math.round((moodCounts['Happy'] || 0) / total * 100)}%
            </div>
          </div>
          <div className="stat-card">
            <h4>😢 Sad</h4>
            <div className="number" style={{ fontSize: '28px' }}>
              {Math.round((moodCounts['Sad'] || 0) / total * 100)}%
            </div>
          </div>
          <div className="stat-card">
            <h4>😰 Anxious</h4>
            <div className="number" style={{ fontSize: '28px' }}>
              {Math.round((moodCounts['Anxious'] || 0) / total * 100)}%
            </div>
          </div>
          <div className="stat-card">
            <h4>😣 Stressed</h4>
            <div className="number" style={{ fontSize: '28px' }}>
              {Math.round((moodCounts['Stressed'] || 0) / total * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* MOOD HISTORY */}
      <div className="card">
        <h3>📋 Recent Mood Entries</h3>
        <div style={{ marginTop: '20px' }}>
          {moods.length > 0 ? (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {[...moods].reverse().slice(0, 10).map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    backgroundColor: '#f9f9f9',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                >
                  <div>
                    <span style={{ fontSize: '18px', marginRight: '10px' }}>{moodEmojis[m.mood] || '😐'}</span>
                    <strong style={{ color: '#27ae60' }}>{m.mood}</strong>
                  </div>
                  <span style={{ color: '#999', fontSize: '12px' }}>{m.date} {m.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999', textAlign: 'center' }}>
              No mood entries yet. Start tracking by visiting the Chatbot!
            </p>
          )}
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="card">
        <h3>💡 Wellness Recommendations</h3>
        <div style={{ marginTop: '15px' }}>
          <p>✅ Keep up with daily check-ins</p>
          <p>✅ Practice breathing exercises when stressed</p>
          <p>✅ Maintain a healthy sleep schedule</p>
          <p>✅ Stay socially connected</p>
          <p>✅ Celebrate the progress you've made!</p>
        </div>
      </div>

      {/* RESET DATA BUTTON */}
      <div className="card">
        <h3>⚙️ Settings</h3>
        <button
          onClick={handleClearData}
          style={{
            background: '#e74c3c',
            boxShadow: '0 5px 15px rgba(231, 76, 60, 0.4)'
          }}
        >
          Clear All Data
        </button>
      </div>
    </div>
  )
}
