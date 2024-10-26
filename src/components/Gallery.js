// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebaseConfig'; // Import firestore from your config

const Gallery = () => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Create a query to get drawings ordered by createdAt
    const drawingsQuery = query(
      collection(firestore, 'drawings'), // Access the 'drawings' collection
      orderBy('createdAt', 'desc') // Order by 'createdAt' field
    );

    // Subscribe to the Firestore collection
    const unsubscribe = onSnapshot(drawingsQuery, snapshot => {
      const fetchedDrawings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDrawings(fetchedDrawings);
      setLoading(false); // Set loading to false once data is fetched
    }, (error) => {
      console.error("Error fetching drawings: ", error); // Error handling for snapshot listener
      setLoading(false); // Ensure loading is set to false even on error
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div>
      <h2>Gallery</h2>
      {loading ? (
        <p>Loading drawings...</p>
      ) : drawings.length === 0 ? (
        <p>No drawings available</p>
      ) : (
        drawings.map(drawing => (
          <div key={drawing.id} style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img
              src={drawing.url}
              alt="User drawing"
              style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc', borderRadius: '5px' }} // Added styles for better presentation
            />
            <p>Drawn by: {drawing.displayName || 'Anonymous'}</p> {/* Show display name or fallback to 'Anonymous' */}
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
