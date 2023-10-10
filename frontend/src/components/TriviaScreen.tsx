import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TriviaScreen.css';

const TriviaScreen: React.FC = () => {
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [selectedGalaxy, setSelectedGalaxy] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUniverseSelect = (world: string) => {
    setSelectedUniverse(world);
    setSelectedGalaxy(null);
  };

  const handleWorldSelect = (level: string) => {
    setSelectedGalaxy(level);
  };

  const handlePracticeClick = () => {
    //console.log(`Starting practice in ${selectedWorld} - Level ${selectedLevel}`);
    navigate('/trivia/play',{replace: true, state:{universe: selectedUniverse, galaxy: selectedGalaxy}});
  };

  const universes = ['Primaria', 'Secundaria', 'Universidad'];
  const primariaGalaxies = ['1', '2', '3', '4', '5', '6'];
  const secundariaGalaxies = ['1', '2', '3', '4', '5', '6'];
  const universidadGalaxies = ['Analisis 1', 'Analisis 2', 'Analisis 3', 'GAL 1', 'GAL 2', 'PyE'];

  return (
    <div className="trivia-screen">
      <h1>Choose a World</h1>
      <div className="worlds">
        {universes.map((universe) => (
          <div
            key={universe}
            className={`world-card ${selectedUniverse === universe ? 'selected' : ''}`}
            onClick={() => handleUniverseSelect(universe)}
          >
            <h2>{universe}</h2>
          </div>
        ))}
      </div>

      {(selectedUniverse === 'Primaria' || selectedUniverse === 'Secundaria') && (
        <div>
          <h1>Choose a Level</h1>
          <div className="levels">
            {(selectedUniverse === 'Primaria' ? primariaGalaxies : secundariaGalaxies).map((level) => (
              <div
                key={level}
                className={`level-card ${selectedGalaxy === level ? 'selected' : ''}`}
                onClick={() => handleWorldSelect(level)}
              >
                <h2>Level {level}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedUniverse === 'Universidad' && (
        <div>
          <h1>Choose a Level</h1>
          <div className="levels">
            {universidadGalaxies.map((level) => (
              <div
                key={level}
                className={`level-card ${selectedGalaxy === level ? 'selected' : ''}`}
                onClick={() => handleWorldSelect(level)}
              >
                <h2>{level}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedUniverse && selectedGalaxy && (
        <button className="practice-button" onClick={handlePracticeClick}>
          Practicar
        </button>
      )}
    </div>
  );
};

export default TriviaScreen;
