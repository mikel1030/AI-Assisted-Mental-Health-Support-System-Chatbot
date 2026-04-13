export const getMoodsFromStorage = () => {
  return JSON.parse(localStorage.getItem('moods')) || []
}

export const addMoodToStorage = (mood) => {
  const moods = getMoodsFromStorage()
  moods.push({
    mood,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  })
  localStorage.setItem('moods', JSON.stringify(moods))
}

export const getStreakFromStorage = () => {
  return parseInt(localStorage.getItem('streak')) || 0
}

export const updateStreakInStorage = () => {
  const today = new Date().toLocaleDateString()
  const lastMoodDate = localStorage.getItem('lastMoodDate') || ''
  
  if (lastMoodDate !== today) {
    const currentStreak = getStreakFromStorage()
    localStorage.setItem('streak', currentStreak + 1)
    localStorage.setItem('lastMoodDate', today)
  }
}

export const clearAllStorage = () => {
  localStorage.clear()
}

export const getLastMoodDate = () => {
  return localStorage.getItem('lastMoodDate') || ''
}

// Authentication functions
export const loginUser = (username, fullName) => {
  if (!username) {
    throw new Error('Username is required')
  }
  const user = { 
    username, 
    fullName: fullName || username,
    loginTime: new Date().toISOString() 
  }
  localStorage.setItem('currentUser', JSON.stringify(user))
  return user
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

export const logoutUser = () => {
  localStorage.removeItem('currentUser')
}
