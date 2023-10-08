// src/components/LevelButton.tsx
import React from 'react';

interface LevelButtonProps {
  level: number;
  onClick: () => void;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onClick }) => {
  return (
    <button className="level-button" onClick={onClick}>
      Level {level}
    </button>
  );
};

export default LevelButton;
