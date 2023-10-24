import React from 'react';
import './WorldSelect.css'; 

interface WorldSelectProps {
    borderColor: string;
    onClick: () => void;
    title: string;
}


const WorldSelect: React.FC<WorldSelectProps> = ({ borderColor, onClick, title }) => {
  const ringStyle = {
    borderColor: borderColor || 'black',
  };

  return (
    <div className="world-select-container">
      <div className="ring" style={ringStyle}>
        <div className="center-text" onClick={onClick}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default WorldSelect;
