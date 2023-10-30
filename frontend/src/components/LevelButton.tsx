// src/components/LevelButton.tsx
import React from 'react';

interface LevelButtonProps {
  level: number;
  onClick: () => void;
  current_level: number;
  index: number;
}

const LevelButton: React.FC<LevelButtonProps> = ({ level, onClick, current_level, index}) => {
  const isDisabled = current_level < level
  const isCompleted = level < current_level

  return (
    <button 
      className={isCompleted ? 'level-button-completed' : (isDisabled ? 'level-button-disabled' : 'level-button')}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      Nivel {index+1}
    </button>
  );
};

export default LevelButton;
