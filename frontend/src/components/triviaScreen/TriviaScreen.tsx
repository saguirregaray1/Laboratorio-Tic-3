import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TriviaScreen.css';
import NavBar from '../NavBar';
import Card from '../card/Card';
import CustomButton from '../customButton/customButton';

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

  const starCount = 1000;
  const stars = Array.from({ length: starCount }, (_, index) => {
    const style = {
      animationDelay: `${Math.random() * 2}s`,
      left: `${Math.random() * 100}%`,
    };
    return <div key={index} className="star" style={style}></div>;
  });

  const universes = ['Primaria', 'Secundaria', 'Universidad'];
  const primariaGalaxies = ['1', '2', '3', '4', '5', '6'];
  const secundariaGalaxies = ['1', '2', '3', '4', '5', '6'];
  const universidadGalaxies = ['Analisis 1', 'Analisis 2', 'Analisis 3', 'GAL 1', 'GAL 2', 'PyE'];

/*
  return (
    <div>
      <NavBar showButtons={false}/>
      <div className="trivia-screen">
        <div className='title'>
          <h1>Elige un mundo</h1>
        </div>
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
      
    </div>
  );
};

export default TriviaScreen;
*/
/*
<Footer 
aboutText="About us" 
contactText="Contact" 
servicesText="Sevices"
copyrightText="©Copyright 2023 Florida. All Rights Reserved."
/>
*/


return (
  <div>
    <div className='star-rain-container'>
      {stars}
      <NavBar showButtons={false}/>
      <h1 className='title-trivia'>Elige un mundo</h1>
      <div className="worlds">
        {universes.map((universe) => (
          <Card
          title={universe}
          text="Juega y diviertete con amigos y personas online, desafialos a distinos modos de juego."
          imageSrc={null}
          color="#fdf0d5"
          font="Courier"
          onClick={() => handleUniverseSelect(universe)}
          />
        ))}
      </div>

      {(selectedUniverse === 'Primaria' || selectedUniverse === 'Secundaria') && (
        <div className='trivia-screen'>
          <h1 className='title-trivia'>Elige un nivel</h1>
          <div className="levels">
            {(selectedUniverse === 'Primaria' ? primariaGalaxies : secundariaGalaxies).map((level) => (
              <Card
              title={level}
              text="En este nivel podras encontrar"
              imageSrc={null}
              color="#fdf0d5"
              font="Courier"
              onClick={() => handleWorldSelect(level)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedUniverse === 'Universidad' && (
        <div className='trivia-screen'>
          <h1 className='title-trivia'>Elige un nivel</h1>
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
        <CustomButton
        label='Jugar'
        onClick={handlePracticeClick}
        />
      )}

    </div>
  </div>
);
};

export default TriviaScreen;

