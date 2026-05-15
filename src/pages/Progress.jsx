import { useState, useEffect } from 'react'
import { getMoodsFromStorage, getStreakFromStorage, clearAllStorage, getLatestAssessment, getAssessmentEngagements } from '../utils/storage'
import { moodEmojis } from '../utils/data'

export default function Progress() {
  const [moods, setMoods] = useState([])
  const [streak, setStreak] = useState(0)
  const [moodCounts, setMoodCounts] = useState({})
  const [wellnessScore, setWellnessScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [assessment, setAssessment] = useState(null)
  const [engagements, setEngagements] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const fetchedMoods = await getMoodsFromStorage()
      const fetchedStreak = await getStreakFromStorage()
      const latestAssessment = await getLatestAssessment()
      const assessmentEngagements = await getAssessmentEngagements()
      
      setMoods(fetchedMoods)
      setStreak(fetchedStreak)
      setAssessment(latestAssessment)
      setEngagements(assessmentEngagements)
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
        <h2>Your Mental Health Journey</h2>
        <p style={{ color: '#666' }}>
          Track your mood trends and celebrate your progress.
        </p>
      </div>

      {/* ASSESSMENT STATUS */}
      {assessment && assessment.categoryScores && (
        <div className="card" style={{ borderLeft: `4px solid ${assessment.assessmentLevel.color}`, background: '#fafafa' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '40px' }}>{assessment.assessmentLevel.emoji}</div>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: assessment.assessmentLevel.color }}>
                  {assessment.assessmentLevel.name}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  Last Assessment: <strong>{assessment.timestamp ? new Date(assessment.timestamp).toLocaleDateString() : 'Today'}</strong>
                </p>
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: assessment.assessmentLevel.color, textAlign: 'center' }}>
              {assessment.overallScore}/5.0
            </div>
          </div>

          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#555', fontStyle: 'italic' }}>
            {assessment.assessmentLevel.description}
          </p>

          {/* Assessment breakdown */}
          <div style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#27ae60', fontSize: '14px' }}>Your Assessment Breakdown:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {Object.entries(assessment.categoryScores)
                .sort((a, b) => b[1].score - a[1].score)
                .map(([key, category], idx) => (
                  <div key={idx} style={{
                    padding: '12px',
                    background: category.score >= 4 ? '#ffebee' : category.score >= 2.5 ? '#fff3e0' : '#e8f5e9',
                    borderLeft: `3px solid ${category.score >= 4 ? '#e74c3c' : category.score >= 2.5 ? '#f39c12' : '#27ae60'}`,
                    borderRadius: '6px'
                  }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: '600', color: '#333' }}>
                      {category.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: category.score >= 4 ? '#e74c3c' : category.score >= 2.5 ? '#f39c12' : '#27ae60' }}>
                      {category.score.toFixed(1)}/5
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#666', lineHeight: '1.3' }}>
                      {category.insight}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent engagements */}
          {engagements.length > 0 && (
            <div style={{ background: '#f0faf4', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #27ae60' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#27ae60', fontSize: '14px' }}>Recent Chatbot Sessions with Assessment Context:</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {engagements.slice(0, 5).map((eng, idx) => (
                  <div key={idx} style={{
                    padding: '10px',
                    marginBottom: '8px',
                    background: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{ margin: '0 0 2px 0', fontWeight: '600', color: '#333' }}>
                        Status: <span style={{ color: eng.assessmentLevel === 'Thriving' ? '#27ae60' : eng.assessmentLevel === 'Managing' ? '#f39c12' : '#e74c3c' }}>
                          {eng.assessmentLevel}
                        </span>
                      </p>
                      <p style={{ margin: 0, color: '#999' }}>{eng.date} {eng.time}</p>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#27ae60' }}>
                      {eng.overallScore}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}