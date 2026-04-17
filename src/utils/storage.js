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