import React from 'react';
import './WorldSelect.css'; 

interface WorldSelectProps {
    onClick: () => void;
    title: string;
    selectedItem: string;
}


const WorldSelect: React.FC<WorldSelectProps> = ({onClick, title, selectedItem }) => {

  return (
    <div className="world-select-container">
      <div className={`${selectedItem==title ? 'selected-ring' : ''} ring`} onClick={onClick}>
        <div className="center-text" >
          {title}
        </div>
      </div>
    </div>
  );
};

export default WorldSelect;
