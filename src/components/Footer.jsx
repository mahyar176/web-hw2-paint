import React, { useMemo } from 'react';

function Footer({ shapes }) {
  const shapeCounts = useMemo(() => {
    return shapes.reduce(
      (counts, shape) => {
        counts[shape.type] = (counts[shape.type] || 0) + 1;
        return counts;
      },
      {}
    );
  }, [shapes]);

  return (
    <footer className="app-footer">
      <div className="shape-count">
        <div className="count-item">
          <div className="shape-icon square"></div>
          <span>{shapeCounts.square || 0}</span>
        </div>
        <div className="count-item">
          <div className="shape-icon circle"></div>
          <span>{shapeCounts.circle || 0}</span>
        </div>
        <div className="count-item">
          <div className="shape-icon triangle"></div>
          <span>{shapeCounts.triangle || 0}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;