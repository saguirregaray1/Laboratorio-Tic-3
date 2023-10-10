import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar"
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import LevelButton from './LevelButton';
import axios from 'axios';
import './LevelSelectionScreen.css';

const LevelSelectionScreen: React.FC<{}> = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const levels = Array.from({ length: 25 }, (_, i) => i + 1);
  const current_level = 14;

  return (
    <>
      <NavBar showButtons={false}/>
      <div className="level-selection-screen">
        <h1 className='level-title'>3° Escuela | Divisiones</h1>
        <hr className="horizontal-line"/>
        <div className="level-grid">
          {levels.map((level) => (
              (current_level < level) ? (
                <LevelButton level={level} onClick={() => setSelectedLevel(level)} current_level={current_level} />
              ) : (
                <Link to={`/question/${level}`} key={level}>
                    <LevelButton level={level} onClick={() => setSelectedLevel(level)} current_level={current_level} />
                </Link>
              )
          ))}
        </div>
      </div>
    </>
  );
};

export default LevelSelectionScreen;