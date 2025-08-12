import React, { useState, useCallback, useEffect } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Canvas from './Canvas.jsx';
import Footer from './Footer.jsx';

function PaintingPage({ initialPainting, userData, onLogout }) {
  const [paintingTitle, setPaintingTitle] = useState(initialPainting.title || 'My Painting');
  const [shapes, setShapes] = useState(initialPainting.shapes || []);
  const [selectedShape, setSelectedShape] = useState(null);

  const addShape = useCallback((shape) => {
    setShapes((prevShapes) => [...prevShapes, { ...shape, id: Date.now() }]);
  }, []);

  const deleteShape = useCallback((id) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
  }, []);

  return (
    <div className="app-container">
      <Header
        paintingTitle={paintingTitle}
        shapes={shapes}
        userData={userData}
        onLogout={onLogout}
      />
      <div className="main-content">
        <Sidebar selectedShape={selectedShape} onSelectShape={setSelectedShape} />
        <Canvas
          shapes={shapes}
          selectedShape={selectedShape}
          onAddShape={addShape}
          onDeleteShape={deleteShape}
        />
      </div>
      <Footer shapes={shapes} />
    </div>
  );
}

export default PaintingPage;