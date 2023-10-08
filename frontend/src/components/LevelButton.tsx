// src/components/LevelButton.tsx
import React from 'react';

interface LevelButtonProps {
  level: number;
  onClick: () => void;
  current_level: number;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onClick, current_level}) => {
  return (
    <button className={(current_level <= level) ? 'level-button' : 'level-button-completed' } onClick={onClick}>
      Level {level}
    </button>
  );
};

export default LevelButton;
