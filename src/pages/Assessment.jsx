import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assessmentQuestions, assessmentLevels, getAssessmentLevel, getCategoryInsights } from '../utils/assessmentData'
import { saveAssessmentResults } from '../utils/storage'
import '../styles/Login.css'

export default function Assessment({ onAssessmentComplete }) {
  const navigate = useNavigate()
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState(null)

  const categories = Object.keys(assessmentQuestions).map(key => ({
    key,
    ...assessmentQuestions[key]
  }))

  const currentCategory = categories[currentCategoryIndex]
  const currentQuestion = currentCategory.questions[currentQuestionIndex]
  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const handleAnswer = (value) => {
    const questionId = currentQuestion.id
    setAnswers(prev => ({ ...prev, [questionId]: value }))

    // Move to next question
    setTimeout(() => {
      if (currentQuestionIndex < currentCategory.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else if (currentCategoryIndex < categories.length - 1) {
        setCurrentQuestionIndex(0)
        setCurrentCategoryIndex(prev => prev + 1)
      } else {
        // Assessment complete, calculate results
        calculateResults()
      }
    }, 300)
  }

  const calculateResults = async () => {
    setLoading(true)

    // Calculate category scores
    const categoryScores = {}
    categories.forEach(category => {
      const categoryQuestions = category.questions
      const categoryAnswers = categoryQuestions
        .map(q => answers[q.id])
        .filter(answer => answer !== undefined)

      if (categoryAnswers.length > 0) {
        const average = categoryAnswers.reduce((a, b) => a + b, 0) / categoryAnswers.length
        categoryScores[category.key] = {
          name: category.category,
          score: Math.round(average * 10) / 10,
          maxScore: 5,
          insight: getCategoryInsights(category.category, average)
        }
      }
    })

    // Calculate overall assessment score
    const overallScore = Object.values(categoryScores)
      .reduce((sum, cat) => sum + cat.score, 0) / Object.values(categoryScores).length

    const assessmentLevel = getAssessmentLevel(overallScore)

    const results = {
      timestamp: new Date().toISOString(),
      overallScore: Math.round(overallScore * 10) / 10,
      assessmentLevel,
      categoryScores,
      totalAnswers: answeredQuestions
    }

    setAssessmentResults(results)
    setShowResults(true)

    // Save assessment to both Firebase and localStorage
    try {
      await saveAssessmentResults(results)
    } catch (error) {
      console.error('Failed to save to Firebase, using localStorage:', error)
      localStorage.setItem('lastAssessment', JSON.stringify(results))
      localStorage.setItem('assessmentCompleted', 'true')
    }

    setLoading(false)
  }

  const handleContinueToHome = () => {
    if (onAssessmentComplete) {
      onAssessmentComplete(assessmentResults)
    }
    navigate('/home')
  }

  const handleRetakeAssessment = () => {
    setAnswers({})
    setCurrentCategoryIndex(0)
    setCurrentQuestionIndex(0)
    setShowResults(false)
    setAssessmentResults(null)
  }

  if (showResults && assessmentResults) {
    return (
      <div className="login-page">
        <div className="login-container" style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="login-logo">
            <h1>🌿 Kumusta AI</h1>
            <p className="tagline">Your Mental Health Journey Snapshot</p>
          </div>

          {/* Overall Score - More Celebratory */}
          <div className="login-form">
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '30px',
              background: `linear-gradient(135deg, ${assessmentResults.assessmentLevel.color}15, ${assessmentResults.assessmentLevel.color}25)`,
              padding: '28px',
              borderRadius: '16px',
              border: `2px solid ${assessmentResults.assessmentLevel.color}40`
            }}>
              <div style={{ 
                fontSize: '80px', 
                marginBottom: '16px',
                animation: 'bounce 0.6s ease-in-out'
              }}>
                {assessmentResults.assessmentLevel.emoji}
              </div>
              <h2 style={{ 
                fontSize: '36px', 
                color: assessmentResults.assessmentLevel.color, 
                marginBottom: '12px',
                fontWeight: '700'
              }}>
                {assessmentResults.assessmentLevel.name}
              </h2>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
                Your current wellbeing score is <strong style={{ fontSize: '20px', color: assessmentResults.assessmentLevel.color }}>
                  {assessmentResults.overallScore}/5.0
                </strong>
              </p>
              <p style={{ fontSize: '14px', color: '#555', margin: '0', lineHeight: '1.6' }}>
                {assessmentResults.assessmentLevel.description}
              </p>
            </div>

            {/* Category Breakdown - More Visual */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '18px', color: '#333', fontSize: '18px', fontWeight: '600' }}>
                ✨ How You're Doing in Each Area
              </h3>
              <div style={{ display: 'grid', gap: '14px' }}>
                {Object.values(assessmentResults.categoryScores).map((category, index) => {
                  const scorePercent = (category.score / 5) * 100;
                  const getScoreBadge = (score) => {
                    if (score >= 4) return '🌟';
                    if (score >= 3) return '✅';
                    if (score >= 2) return '⚡';
                    return '💪';
                  };
                  
                  return (
                    <div
                      key={index}
                      style={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        border: `2px solid #e8f5e9`,
                        borderRadius: '12px',
                        hoverEffect: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <strong style={{ color: '#333', fontSize: '15px' }}>{category.name}</strong>
                          <p style={{ fontSize: '12px', color: '#27ae60', marginTop: '4px', fontWeight: '500' }}>
                            {getScoreBadge(category.score)} {category.score}/5.0
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '12px',
                          backgroundColor: '#e0e0e0',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          marginBottom: '10px'
                        }}
                      >
                        <div
                          style={{
                            width: `${scorePercent}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, #27ae60, #2ecc71)`,
                            transition: 'width 0.5s ease',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <p style={{ fontSize: '13px', color: '#555', margin: '0', lineHeight: '1.5' }}>
                        {category.insight}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations - Friendly & Actionable */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '18px', color: '#333', fontSize: '18px', fontWeight: '600' }}>
                🎯 Your Personal Wellness Tips
              </h3>
              <div
                style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, #e8f5e9, #f1f8e9)`,
                  borderRadius: '12px',
                  borderLeft: `5px solid ${assessmentResults.assessmentLevel.color}`
                }}
              >
                <ul style={{ margin: 0, paddingLeft: '24px', lineHeight: '2' }}>
                  {assessmentResults.assessmentLevel.recommendations.map((rec, index) => (
                    <li key={index} style={{ color: '#333', fontSize: '14px', marginBottom: '8px' }}>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons - More Engaging */}
            <div style={{ display: 'grid', gap: '12px', marginTop: '28px' }}>
              <button
                className="login-button"
                onClick={handleContinueToHome}
                style={{ 
                  backgroundColor: '#27ae60',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '14px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
                }}
              >
                ✨ Let's Chat & Get Support
              </button>
              <button
                className="login-button"
                onClick={handleRetakeAssessment}
                style={{ 
                  backgroundColor: '#3498db',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '14px'
                }}
              >
                🔄 Retake Assessment
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#999', marginTop: '20px', textAlign: 'center', lineHeight: '1.6' }}>
              💡 Pro tip: Retake this anytime to track your progress. Your journey matters! 
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-container" style={{ maxWidth: '700px' }}>
        <div className="login-logo">
          <h1>🌿 Kumusta AI</h1>
          <p className="tagline">Mental Health Assessment</p>
        </div>

        <div className="login-form">
          {/* Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#27ae60' }}>Progress</span>
              <span style={{ fontSize: '12px', color: '#999' }}>
                {answeredQuestions} of {totalQuestions}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#27ae60',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Category Info */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '4px', color: '#333' }}>
              {currentCategory.category}
            </h2>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '0' }}>
              {currentCategory.description}
            </p>
          </div>

          {/* Current Question */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
              <strong>{currentQuestionIndex + 1}. {currentQuestion.text}</strong>
            </p>

            {/* Answer Options */}
            <div>
              {currentQuestion.type === 'scale' ? (
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '8px',
                      marginBottom: '12px'
                    }}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer(num)}
                        style={{
                          padding: '12px 8px',
                          borderRadius: '6px',
                          border: `2px solid ${answers[currentQuestion.id] === num ? '#27ae60' : '#ddd'}`,
                          backgroundColor: answers[currentQuestion.id] === num ? '#27ae60' : '#fff',
                          color: answers[currentQuestion.id] === num ? '#fff' : '#333',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#999' }}>
                    <span>{currentQuestion.scale.minLabel}</span>
                    <span>{currentQuestion.scale.maxLabel}</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '6px',
                        border: `2px solid ${answers[currentQuestion.id] === option.value ? '#27ae60' : '#ddd'}`,
                        backgroundColor: answers[currentQuestion.id] === option.value ? '#e8f5e9' : '#fff',
                        color: '#333',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        fontWeight: answers[currentQuestion.id] === option.value ? '600' : '400'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'grid', gap: '10px', marginTop: '24px' }}>
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(prev => prev - 1)
                } else if (currentCategoryIndex > 0) {
                  setCurrentCategoryIndex(prev => prev - 1)
                  setCurrentQuestionIndex(categories[currentCategoryIndex - 1].questions.length - 1)
                }
              }}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#95a5a6',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                opacity: currentCategoryIndex === 0 && currentQuestionIndex === 0 ? 0.5 : 1,
                pointerEvents: currentCategoryIndex === 0 && currentQuestionIndex === 0 ? 'none' : 'auto'
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                if (currentQuestionIndex < currentCategory.questions.length - 1) {
                  setCurrentQuestionIndex(prev => prev + 1)
                } else if (currentCategoryIndex < categories.length - 1) {
                  setCurrentQuestionIndex(0)
                  setCurrentCategoryIndex(prev => prev + 1)
                }
              }}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#3498db',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                opacity: !answers[currentQuestion.id] ? 0.5 : 1,
                pointerEvents: !answers[currentQuestion.id] ? 'none' : 'auto'
              }}
            >
              Next →
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#999', marginTop: '12px', textAlign: 'center' }}>
            Category {currentCategoryIndex + 1} of {categories.length}
          </p>
        </div>
      </div>
    </div>
  )
}
