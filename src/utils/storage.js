import { db, auth } from './firebase'
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore'

// ============= USER SESSION =============

export const getCurrentUser = () => {
  const user = auth.currentUser
  return user ? localStorage.getItem('currentUsername') : null
}

export const getCurrentUserFullName = () => {
  return localStorage.getItem('currentUserFullName') || getCurrentUser()
}

export const setCurrentUserLocally = (username, fullName) => {
  localStorage.setItem('currentUsername', username)
  localStorage.setItem('currentUserFullName', fullName || username)
}

export const clearCurrentUserLocally = () => {
  localStorage.removeItem('currentUsername')
  localStorage.removeItem('currentUserFullName')
  localStorage.removeItem('currentUID')
}

export const isUserLoggedIn = () => {
  return !!auth.currentUser
}

// ============= MOOD TRACKING =============

export const getMoodsFromStorage = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return []
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? (userDoc.data().moods || []) : []
}

export const addMoodToStorage = async (mood) => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) throw new Error('User not logged in')
  const moodEntry = {
    mood,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  }
  await updateDoc(doc(db, 'users', uid), {
    moods: arrayUnion(moodEntry)
  })
}

export const getStreakFromStorage = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return 0
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? (userDoc.data().streak || 0) : 0
}

export const updateStreakInStorage = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return
  const userDoc = await getDoc(doc(db, 'users', uid))
  if (!userDoc.exists()) return
  const data = userDoc.data()
  const today = new Date().toLocaleDateString()
  if (data.lastMoodDate !== today) {
    await updateDoc(doc(db, 'users', uid), {
      streak: (data.streak || 0) + 1,
      lastMoodDate: today
    })
  }
}

export const saveChatMessage = async (role, text) => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return
  await updateDoc(doc(db, 'users', uid), {
    chatHistory: arrayUnion({
      role,
      text,
      timestamp: new Date().toISOString()
    })
  })
}

export const getChatHistory = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return []
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? (userDoc.data().chatHistory || []) : []
}

export const clearAllStorage = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return
  await updateDoc(doc(db, 'users', uid), {
    moods: [],
    streak: 0,
    lastMoodDate: '',
    chatHistory: []
  })
}

// ============= ASSESSMENT TRACKING =============

export const saveAssessmentResults = async (assessmentResults) => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) throw new Error('User not logged in')
  
  try {
    // Save assessment with timestamp to create history
    const assessmentEntry = {
      ...assessmentResults,
      savedAt: new Date().toISOString(),
      timestamp: new Date().toISOString()
    }

    // Get existing assessments
    const userDoc = await getDoc(doc(db, 'users', uid))
    const existingAssessments = userDoc.exists() ? (userDoc.data().assessmentHistory || []) : []

    // Add new assessment to history (keep last 10 assessments)
    const updatedAssessments = [assessmentEntry, ...existingAssessments].slice(0, 10)

    // Update with both current and history
    await updateDoc(doc(db, 'users', uid), {
      lastAssessment: assessmentEntry,
      assessmentHistory: updatedAssessments,
      lastAssessmentDate: new Date().toLocaleDateString()
    })

    // Also save to localStorage for quick access
    localStorage.setItem('lastAssessment', JSON.stringify(assessmentEntry))
    localStorage.setItem('assessmentCompleted', 'true')

    return true
  } catch (error) {
    console.error('Error saving assessment:', error)
    // Fallback to localStorage
    localStorage.setItem('lastAssessment', JSON.stringify(assessmentResults))
    localStorage.setItem('assessmentCompleted', 'true')
    return false
  }
}

export const getLatestAssessment = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return null

  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists() && userDoc.data().lastAssessment) {
      return userDoc.data().lastAssessment
    }
  } catch (error) {
    console.error('Error fetching assessment:', error)
  }

  // Fallback to localStorage
  const stored = localStorage.getItem('lastAssessment')
  return stored ? JSON.parse(stored) : null
}

export const getAssessmentHistory = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return []

  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists() && userDoc.data().assessmentHistory) {
      return userDoc.data().assessmentHistory
    }
  } catch (error) {
    console.error('Error fetching assessment history:', error)
  }

  return []
}

export const clearAssessmentData = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return

  try {
    await updateDoc(doc(db, 'users', uid), {
      lastAssessment: null,
      assessmentHistory: [],
      lastAssessmentDate: ''
    })
  } catch (error) {
    console.error('Error clearing assessment:', error)
  }

  localStorage.removeItem('lastAssessment')
  localStorage.removeItem('assessmentCompleted')
}

// ============= ASSESSMENT ENGAGEMENT TRACKING =============

export const recordAssessmentEngagement = async (assessmentData) => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return

  try {
    const engagement = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      overallScore: assessmentData.overallScore,
      assessmentLevel: assessmentData.assessmentLevel.name,
      categoryScores: Object.entries(assessmentData.categoryScores).reduce((acc, [key, val]) => {
        acc[val.name] = val.score
        return acc
      }, {})
    }

    const userDoc = await getDoc(doc(db, 'users', uid))
    const existingEngagements = userDoc.exists() ? (userDoc.data().assessmentEngagements || []) : []
    
    // Keep last 30 engagements
    const updatedEngagements = [engagement, ...existingEngagements].slice(0, 30)

    await updateDoc(doc(db, 'users', uid), {
      assessmentEngagements: updatedEngagements,
      lastEngagementDate: new Date().toLocaleDateString()
    })
  } catch (error) {
    console.error('Error recording assessment engagement:', error)
  }
}

export const getAssessmentEngagements = async () => {
  const uid = localStorage.getItem('currentUID')
  if (!uid) return []

  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists() && userDoc.data().assessmentEngagements) {
      return userDoc.data().assessmentEngagements
    }
  } catch (error) {
    console.error('Error fetching assessment engagements:', error)
  }

  return []
}