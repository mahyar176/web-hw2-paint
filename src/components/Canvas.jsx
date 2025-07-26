import React, { useRef } from 'react';

const Shape = ({ data, onDelete }) => {
  // THE FIX: The main style object no longer needs the cursor property.
  const style = {
    position: 'absolute',
    left: `${data.x}px`,
    top: `${data.y}px`,
    width: '50px',
    height: '50px',
  };

  if (data.type === 'triangle') {
    return (
      <svg
        style={style}
        className="shape triangle-svg"
        viewBox="0 0 100 100"
      >
        <polygon
          // THE FIX: We will now control the cursor via CSS on this element.
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
      style={{ ...style, cursor: 'pointer' }} // Add cursor back for div-based shapes
      className={`shape ${data.type}`}
      onDoubleClick={onDelete}
    ></div>
  );
};


// The rest of the file remains the same
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

  return (
    <main className="canvas" onClick={handleCanvasClick}>
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