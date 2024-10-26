// src/components/DrawCanvas.js
import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { storage, firestore, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DrawCanvas = () => {
  const canvasRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate

  const saveDrawing = async () => {
    const drawingData = canvasRef.current.getSaveData();
    const user = auth.currentUser;

    if (user) {
      try {
        const storageRef = storage.ref(`drawings/${user.uid}/${Date.now()}.png`);
        await storageRef.putString(drawingData, 'data_url');
        const url = await storageRef.getDownloadURL();

        await firestore.collection('drawings').add({
          url,
          userId: user.uid,
          displayName: user.displayName || 'Anonymous', // Save the user's display name
          createdAt: new Date(),
        });

        // Navigate to the gallery after saving the drawing
        navigate('/gallery'); // Redirect to the gallery page
      } catch (error) {
        console.error("Error saving drawing:", error);
      }
    }
  };

  // Function to navigate to the gallery without saving
  const goToGallery = () => {
    navigate('/gallery');
  };

  return (
    <div>
      <CanvasDraw ref={canvasRef} />
      <button onClick={saveDrawing}>Save Drawing</button>
      <button onClick={goToGallery} style={{ marginLeft: '10px' }}>
        View Gallery
      </button>
    </div>
  );
};

export default DrawCanvas;
