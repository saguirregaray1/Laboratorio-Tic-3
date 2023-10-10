// src/components/LevelButton.tsx
import React from 'react';

interface LevelButtonProps {
  level: number;
  onClick: () => void;
  current_level: number;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onClick, current_level}) => {
  const isDisabled = current_level < level
  const isCompleted = level < current_level

  return (
    <button 
      className={isCompleted ? 'level-button-completed' : (isDisabled ? 'level-button-disabled' : 'level-button')}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      Nivel {level}
    </button>
  );
};

export default LevelButton;
