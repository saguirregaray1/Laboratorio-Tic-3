import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import LevelButton from './LevelButton';
import axios from 'axios';
import './LevelSelectionScreen.css';

const LevelSelectionScreen: React.FC<{}> = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const levels = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="level-selection-screen">
      <h1>Math Adventure</h1>
      <div className="level-grid">
        {levels.map((level) => (
            <Link to={`/question/${level}`} key={level}>
                <LevelButton level={level} onClick={() => setSelectedLevel(level)} />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default LevelSelectionScreen;

