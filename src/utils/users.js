import { auth, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const registerUser = async (fullName, username, password) => {
  // Use username@kumusta.app as fake email since we use username-based login
  const email = `${username.toLowerCase()}@kumusta.app`

  // Check if username already exists in Firestore
  const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()))
  if (usernameDoc.exists()) {
    throw new Error('Username already taken. Please choose another.')
  }

  // Create Firebase Auth account
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCredential.user.uid

  // Save user profile to Firestore
  await setDoc(doc(db, 'users', uid), {
    fullName,
    username: username.toLowerCase(),
    email,
    createdAt: new Date().toISOString(),
    moods: [],
    streak: 0,
    lastMoodDate: '',
    chatHistory: []
  })

  // Save username → uid mapping so we can look up by username on login
  await setDoc(doc(db, 'usernames', username.toLowerCase()), { uid })

  return { uid, fullName, username: username.toLowerCase() }
}

export const loginUser = async (username, password) => {
  // Look up uid from username
  const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()))
  if (!usernameDoc.exists()) {
    throw new Error('Invalid username or password. Please try again.')
  }

  const uid = usernameDoc.data().uid
  const email = `${username.toLowerCase()}@kumusta.app`

  // Sign in with Firebase Auth
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  // Get user profile from Firestore
  const userDoc = await getDoc(doc(db, 'users', uid))
  const userData = userDoc.data()

  return { uid, fullName: userData.fullName, username: userData.username }
}

export const logoutUser = async () => {
  await signOut(auth)
}