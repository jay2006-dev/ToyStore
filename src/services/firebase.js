// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore' // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAa0287trlbnWO2e8QezCqOUNmrRqYfa5M',
  authDomain: 'toy-store-28aee.firebaseapp.com',
  projectId: 'toy-store-28aee',
  storageBucket: 'toy-store-28aee.firebasestorage.app',
  messagingSenderId: '459250058402',
  appId: '1:459250058402:web:6fec55d0f5fe2242eac3fb',
  measurementId: 'G-2GYZE0Q3FW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
