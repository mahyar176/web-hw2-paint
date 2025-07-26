import React from 'react';

function Sidebar({ onSelectShape, selectedShape }) {
  const shapes = ['square', 'circle', 'triangle'];

  const handleDragStart = (e, shapeType) => {
    e.dataTransfer.setData('shapeType', shapeType);
  };

  return (
    <aside className="sidebar">
      <h2>Tools</h2>
      <div className="tools-container">
        {shapes.map((shape) => {
          const isSelected = selectedShape === shape;
          return (
            <div
              key={shape}
              className={`tool-shape ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectShape(shape)}
              title={`Select ${shape}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, shape)}
            >
              <div className={shape}></div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;