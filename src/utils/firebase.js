import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZWbU-pAyYWnLt6QkLlLIn1_NBToiAgH0",
  authDomain: "kumusta-ai.firebaseapp.com",
  projectId: "kumusta-ai",
  storageBucket: "kumusta-ai.firebasestorage.app",
  messagingSenderId: "340360829336",
  appId: "1:340360829336:web:e48f1729203d11d44a33ed"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)