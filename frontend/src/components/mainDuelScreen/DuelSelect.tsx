import React, { useState } from 'react';
import './DuelSelect.css';

interface DuelSelectProps{
    onClick: () => void;
    setRoundNumber: (round:number) => void;
    setDifficulty: (difficulty:string) => void;
    createRoom: () => void;
}

const DuelSelect: React.FC<DuelSelectProps> = ({onClick, setRoundNumber, setDifficulty, createRoom}) => {
  const roundNumbers = [3, 5, 7];
  const [selectedRound,setSelectedRound] = useState(0);
  const [isDataMissing, setIsDataMissing] = useState(false);
  const options = ['1 Primaria', '2 Primaria', '3 Primaria', '4 Primaria', '5 Primaria', '6 Primaria', '1 Secundaria', '2 Secundaria', '3 Secundaria', '4 Secundaria', '5 Secundaria', '6 Secundaria', 'GAL1 Universidad', 'GAL2 Universidad', 'AM1 Universidad', 'AM2 Universidad','AM3 Universidad', 'PyE Universidad'];
  const [selectedOption, setSelectedOption] = useState('');
  
  

  return (
      <div className='select-container'>
        <p className='room-title'>Crea una sala</p>
        <p className='duel-select-sub-p'>Número de rondas</p>
        <div className='round-container'>
            {roundNumbers.map((round) => (
                <div className='round-div' onClick={() => setRoundNumber(round)}>{round}</div>
            ))}
        </div>
        <p className='duel-select-sub-p'>Elige una dificultad</p>
        <select id="dropdown" className="duel-dropdown" onChange={(e) => setDifficulty(e.target.value)}>
            <option value="" disabled selected>
                Elige una opción
            </option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <button className='create-button' onClick={createRoom}>
          Crear
        </button>
        <p className='comeback' onClick={onClick}>Volver</p>
      </div>
  );
};

export default DuelSelect;