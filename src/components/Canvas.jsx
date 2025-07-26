import React, { useRef } from 'react';

const Shape = ({ data, onDelete }) => {
  const style = {
    position: 'absolute',
    left: `${data.x}px`,
    top: `${data.y}px`,
  };

  if (data.type === 'triangle') {
    return (
      <svg
        style={style}
        className="shape triangle-svg-container"
        viewBox="0 0 100 100"
      >
        <polygon
          className="triangle-svg-shape"
          points="50,5 95,95 5,95"
          fill="#32cd32"
          stroke="black"
          strokeWidth="3"
          onDoubleClick={onDelete}
        />
      </svg>
    );
  }

  return (
    <div
      style={{ ...style, width: '50px', height: '50px', cursor: 'pointer' }}
      className={`shape ${data.type}`}
      onDoubleClick={onDelete}
    ></div>
  );
};


function Canvas({ shapes, selectedShape, onAddShape, onDeleteShape }) {
  const clickTimeout = useRef(null);

  const handleCanvasClick = (event) => {
    if (!selectedShape) return;

    const canvasRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - canvasRect.left - 25;
    const y = event.clientY - canvasRect.top - 25;

    clearTimeout(clickTimeout.current);

    clickTimeout.current = setTimeout(() => {
      onAddShape({ type: selectedShape, x, y });
    }, 200);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    clearTimeout(clickTimeout.current);
    onDeleteShape(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData('shapeType');

    if (shapeType) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - 25;
      const y = e.clientY - canvasRect.top - 25;
      onAddShape({ type: shapeType, x, y });
    }
  };

  return (
    <main
      className="canvas"
      onClick={handleCanvasClick}
      onDragOver={handleDragOver} 
      onDrop={handleDrop}
    >
      {shapes.map((shape) => (
        <Shape
          key={shape.id}
          data={shape}
          onDelete={(e) => handleDelete(e, shape.id)}
        />
      ))}
    </main>
  );
}

export default Canvas;