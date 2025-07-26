import React, { useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Canvas from './components/Canvas.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  const [paintingTitle, setPaintingTitle] = useState('My Painting');
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const addShape = useCallback((shape) => {
    setShapes((prevShapes) => [...prevShapes, { ...shape, id: Date.now() }]);
  }, []);

  const deleteShape = useCallback((id) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
  }, []);

  const loadPainting = useCallback((data) => {
    setPaintingTitle(data.title);
    setShapes(data.shapes);
  }, []);

  return (
    <div className="app-container">
      <Header
        paintingTitle={paintingTitle}
        setPaintingTitle={setPaintingTitle}
        shapes={shapes}
        onImport={loadPainting}
      />
      <div className="main-content">
        <Sidebar
            selectedShape={selectedShape}
            onSelectShape={setSelectedShape}
        />
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

export default App;