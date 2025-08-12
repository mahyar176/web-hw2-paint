import React from 'react';

const API_URL = 'http://localhost:13000';

function Header({ paintingTitle, shapes, userData, onLogout }) {

  const handleSave = async () => {
    // This is the painting data object
    const paintingData = {
      title: paintingTitle,
      shapes: shapes,
    };

    // THE FIX: Convert the paintingData object to a JSON string here.
    const paintingJsonString = JSON.stringify(paintingData);

    const payload = {
      username: userData.username,
      password: userData.password,
      painting: paintingJsonString, // The 'painting' field is now a string
    };

    try {
      const response = await fetch(`${API_URL}/painting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // The entire payload is still stringified
      });

      if (!response.ok) {
        throw new Error('Failed to save.');
      }
      alert('Painting saved successfully!');

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <header className="app-header">
      <div className="header-title">
        Painting by: <strong>{userData.username}</strong>
      </div>
      <div className="header-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;