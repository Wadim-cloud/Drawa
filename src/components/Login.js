// src/components/Login.js
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firestore, auth } from '../firebaseConfig'; // Ensure these are properly set up in firebaseConfig

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user information in Firestore
      const userRef = firestore.collection('users').doc(user.uid);
      await userRef.set({
        displayName: user.displayName,
        email: user.email,
      }, { merge: true });

      console.log("User info:", user);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
