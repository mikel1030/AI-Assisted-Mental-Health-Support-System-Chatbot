import { useState, useEffect } from 'react'
import { getMoodsFromStorage, getStreakFromStorage, clearAllStorage } from '../utils/storage'
import { moodEmojis } from '../utils/data'

export default function Progress() {
  const [moods, setMoods] = useState([])
  const [streak, setStreak] = useState(0)
  const [moodCounts, setMoodCounts] = useState({})
  const [wellnessScore, setWellnessScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const fetchedMoods = await getMoodsFromStorage()
      const fetchedStreak = await getStreakFromStorage()
      setMoods(fetchedMoods)
      setStreak(fetchedStreak)
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    const counts = { Happy: 0, Sad: 0, Anxious: 0, Stressed: 0 }
    moods.forEach(m => {
      if (counts[m.mood] !== undefined) counts[m.mood]++
    })
    setMoodCounts(counts)
    const score = Math.min(100, counts.Happy * 10 + streak * 5)
    setWellnessScore(score)
  }, [moods, streak])

  const handleClearData = async () => {
    if (window.confirm('Are you sure? This will clear all your data.')) {
      await clearAllStorage()
      setMoods([])
      setStreak(0)
      setMoodCounts({})
      setWellnessScore(0)
      alert('Data cleared!')
    }
  }

  const total = moods.length || 1
  const moodPercents = {
    Happy: Math.round(((moodCounts.Happy || 0) / total) * 100),
    Sad: Math.round(((moodCounts.Sad || 0) / total) * 100),
    Anxious: Math.round(((moodCounts.Anxious || 0) / total) * 100),
    Stressed: Math.round(((moodCounts.Stressed || 0) / total) * 100)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', fontSize: '16px', color: '#27ae60'
      }}>
        Loading your progress...
      </div>
    )
  }

  return (
    <div className="container">

      <div className="card">
        <h2>Your Mental Health Journey 💚</h2>
        <p style={{ color: '#666' }}>
          Track your mood trends and celebrate your progress.
        </p>
      </div>

      {/* STATS */}
      <div className="card">
        <h3>Your Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Streak Days</h4>
            <div className="number">{streak}</div>
          </div>
          <div className="stat-card">
            <h4>Total Check-ins</h4>
            <div className="number">{moods.length}</div>
          </div>
          <div className="stat-card">
            <h4>Happy Days</h4>
            <div className="number">{moodCounts.Happy || 0}</div>
          </div>
          <div className="stat-card">
            <h4>Streak Record</h4>
            <div className="number">{streak}</div>
          </div>
        </div>
      </div>

      {/* WELLNESS BAR */}
      <div className="card">
        <h3>Weekly Mood Improvement</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${wellnessScore}%` }}></div>
        </div>
        <p>{wellnessScore}%</p>
      </div>

      {/* MOOD DISTRIBUTION */}
      <div className="card">
        <h3>Mood Distribution</h3>
        <div className="stats-grid">
          {Object.keys(moodPercents).map((mood) => (
            <div className="stat-card" key={mood}>
              <h4>{mood}</h4>
              <div className="number">{moodPercents[mood]}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <div className="card">
        <h3>Recent Mood Entries</h3>
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
                  transition: '0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              >
                <div>
                  <span style={{ marginRight: '10px' }}>{moodEmojis[m.mood] || ''}</span>
                  <strong>{m.mood}</strong>
                </div>
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {m.date} {m.time}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>
            No mood entries yet.
          </p>
        )}
      </div>

      {/* RESET */}
      <div className="card">
        <h3>Settings</h3>
        <button onClick={handleClearData}>Clear All Data</button>
      </div>

    </div>
  )
}