// src/components/LevelButton.tsx
import React from 'react';

interface LevelButtonProps {
  onClick: () => void;
  current_level: number;
  index: number;
}

const LevelButton: React.FC<LevelButtonProps> = ({ onClick, current_level, index}) => {
  const isDisabled = current_level < index
  const isCompleted = index < current_level

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
