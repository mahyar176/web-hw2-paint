import React, { useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import PaintingPage from './components/PaintingPage.jsx';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [initialPainting, setInitialPainting] = useState(null);

  const handleLoginSuccess = (data) => {
    console.log('inital data: ', data)
    setUserData({ username: data.username, password: data.password });
    setInitialPainting(data.painting && JSON.parse(data.painting).shapes ? JSON.parse(data.painting) : {});
  };

  const handleLogout = () => {
    setUserData(null);
    setInitialPainting(null);
  };

  return (
    <>
      {userData ? (
        <PaintingPage
          initialPainting={initialPainting}
          userData={userData}
          onLogout={handleLogout}
        />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;