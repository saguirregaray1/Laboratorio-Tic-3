import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TriviaScreen.css';
import NavBar from '../NavBar';
import CustomButton from '../customButton/customButton';
import WorldSelect from '../worldSelect/WorldSelect';

const TriviaScreen: React.FC = () => {
  const [selectedUniverse, setSelectedUniverse] = useState<string>('');
  const [selectedGalaxy, setSelectedGalaxy] = useState<string>('');
  const navigate = useNavigate();

  const handleUniverseSelect = (world: string) => {
    setSelectedUniverse(world);
    setSelectedGalaxy('');
  };

  const handleWorldSelect = (level: string) => {
    setSelectedGalaxy(level);
  };

  const handlePracticeClick = () => {
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
  const universidadGalaxies = ['AM1', 'AM2', 'AM3', 'GAL 1', 'GAL 2', 'PyE'];



return (
  <div className='star-rain-container' style={{backgroundColor:'black', height:'100vh'}}>
    {stars}
    <NavBar showButtons={false}/>
    <h1 className='title-trivia'>Elige un mundo</h1>
    <div className="worlds">
      {universes.map((universe) => (
        <WorldSelect
        title={universe}
        onClick={() => handleUniverseSelect(universe)}
        selectedItem={selectedUniverse}
        />
      ))}
    </div>

    {(selectedUniverse === 'Primaria' || selectedUniverse === 'Secundaria') && (
      <div className='trivia-screen'>
        <h1 className='title-trivia'>Elige un nivel</h1>
        <div className="levels">
          {(selectedUniverse === 'Primaria' ? primariaGalaxies : secundariaGalaxies).map((level) => (
            <WorldSelect
            title={level}
            onClick={() => handleWorldSelect(level)}
            selectedItem={selectedGalaxy}
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
            <WorldSelect
            title={level}
            onClick={() => handleWorldSelect(level)}
            selectedItem={selectedGalaxy}
            />
          ))}
        </div>
      </div>
    )}

    {selectedUniverse && selectedGalaxy && (
      <div className='trivia-button-container'>
        <div className='trivia-start-play-button' onClick={handlePracticeClick}>
        Jugar
        </div>
      </div>
      
    )}
  </div>
);
};

export default TriviaScreen;


