import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGlNDZgIJZsSELkow7c3uYf42mzhiePtk",
  authDomain: "house-marketplace-26373.firebaseapp.com",
  projectId: "house-marketplace-26373",
  storageBucket: "house-marketplace-26373.appspot.com",
  messagingSenderId: "726139881561",
  appId: "1:726139881561:web:72aa79a4ae06c76a2e0948",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
