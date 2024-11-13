import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc, updateDoc, Timestamp, increment, serverTimestamp, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBkep4kR1KlxAHUQM8-dJo-b0cOjUA1tCc",
  authDomain: "edufly-61bfe.firebaseapp.com",
  projectId: "edufly-61bfe",
  storageBucket: "edufly-61bfe.firebasestorage.app",
  messagingSenderId: "467191151194",
  appId: "1:467191151194:web:cac30fd47ebff5a7233663",
  measurementId: "G-NQN411353D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const user = auth.currentUser;

export const db = getFirestore(app);
export { auth }
export { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, sendPasswordResetEmail }
export { getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, Timestamp, increment, serverTimestamp, query, where }
