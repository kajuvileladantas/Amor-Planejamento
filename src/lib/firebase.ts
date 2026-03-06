import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6CIZSnkQpLGXhZJZfJRbWNINmIty8c58",
  authDomain: "amoreplanejamento0204.firebaseapp.com",
  projectId: "amoreplanejamento0204",
  storageBucket: "amoreplanejamento0204.firebasestorage.app",
  messagingSenderId: "901699360119",
  appId: "1:901699360119:web:476ebe723591689fd8fd72",
  measurementId: "G-ZSZ3T9QHR2"
};

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
