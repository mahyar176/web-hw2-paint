import React, { useRef } from 'react';

function Header({ paintingTitle, setPaintingTitle, shapes, onImport }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const paintingData = {
      title: paintingTitle,
      shapes: shapes,
    };
    const jsonString = JSON.stringify(paintingData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paintingTitle.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.title && Array.isArray(importedData.shapes)) {
            onImport(importedData);
          } else {
            alert('Invalid JSON format.');
          }
        } catch (error) {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = null;
  };

  return (
    <header className="app-header">
      <input
        type="text"
        value={paintingTitle}
        onChange={(e) => setPaintingTitle(e.target.value)}
        className="painting-title-input"
      />
      <div className="header-buttons">
        <button onClick={handleImportClick}>Import</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
        <button onClick={handleExport}>Export</button>
      </div>
    </header>
  );
}

export default Header;