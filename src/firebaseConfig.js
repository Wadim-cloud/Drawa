// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoc_QSXNgYor0fiHQt7W6Gd9ZMJrw8DrU",
  authDomain: "draw-26a0c.firebaseapp.com",
  projectId: "draw-26a0c",
  storageBucket: "draw-26a0c.appspot.com",
  messagingSenderId: "501065720855",
  appId: "1:501065720855:web:8e9e0a2a79059b8abe2852",
  measurementId: "G-TRHBPXDMCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app); // Use getFirestore instead of firestore
export const storage = getStorage(app); // Use getStorage instead of storage
