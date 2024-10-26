import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DrawCanvas from './components/DrawCanvas';
import Gallery from './components/Gallery';
import { auth } from './firebaseConfig'; // Ensure this imports the correct auth instance

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update state with the user object
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to /draw if logged in, otherwise redirect to /login */}
        <Route path="/" element={<Navigate to={user ? "/draw" : "/login"} />} />
        
        {/* Login route - if user exists, redirect to /draw */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/draw" />} />
        
        {/* Drawing canvas route - if user exists, render component; otherwise redirect to /login */}
        <Route path="/draw" element={user ? <DrawCanvas /> : <Navigate to="/login" />} />
        
        {/* Gallery route - if user exists, render component; otherwise redirect to /login */}
        <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
