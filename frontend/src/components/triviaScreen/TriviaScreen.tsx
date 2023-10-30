import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TriviaScreen.css';
import NavBar from '../NavBar';
import CustomButton from '../customButton/customButton';
import WorldSelect from '../worldSelect/WorldSelect';

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



return (
  <div className='star-rain-container'>
    {stars}
    <NavBar showButtons={false}/>
    <h1 className='title-trivia'>Elige un mundo</h1>
    <div className="worlds">
      {universes.map((universe) => (
        <WorldSelect
        title={universe}
        borderColor='red'
        onClick={() => handleUniverseSelect(universe)}
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
            borderColor = 'blue'
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
            <WorldSelect
            title={level}
            borderColor = 'blue'
            onClick={() => handleWorldSelect(level)}
            />
          ))}
        </div>
      </div>
    )}

    {selectedUniverse && selectedGalaxy && (
      <div className='button'>
        <CustomButton color="#3d5a80"
        label='Jugar'
        isDisabled={false}
        onClick={handlePracticeClick}
        />
      </div>
    )}

  </div>
);
};

export default TriviaScreen;


