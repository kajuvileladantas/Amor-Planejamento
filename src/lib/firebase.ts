// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7gocPkzEK6cx06873KikSOLhM_rlLwiI",
  authDomain: "amoreplanejamento2026.firebaseapp.com",
  projectId: "amoreplanejamento2026",
  storageBucket: "amoreplanejamento2026.firebasestorage.app",
  messagingSenderId: "866600127528",
  appId: "1:866600127528:web:8c146174cc7041710c391d",
  measurementId: "G-XLFJHTRFL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
};
