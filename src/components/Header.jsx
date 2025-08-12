import React from 'react';

const API_URL = 'http://localhost:13000';

function Header({ paintingTitle, shapes, userData, onLogout }) {

  const handleSave = async () => {
    const paintingData = {
      title: paintingTitle,
      shapes: shapes,
    };

    const payload = {
      username: userData.username,
      password: userData.password,
      painting: paintingData,
    };

    try {
      const response = await fetch(`${API_URL}/painting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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