import React, { useState } from 'react';
import './DuelPlay.css';

interface DuelPlayProps{
  onClick: () => void
  onSubmit: () => void
  setDuelId: (id : string) => void
  showIncorrectCode: boolean;
}

const DuelPlay: React.FC<DuelPlayProps> = ({onClick, onSubmit, setDuelId, showIncorrectCode}) => {
  

  return (
      
      <div className='play-container'>
        <p>Juega con amigos</p>
        <input className='play-input' placeholder='Código de juego' onChange={(e) => {setDuelId(e.target.value)}}></input>
        <button className='button-duel' onClick={onSubmit}>
          Ingresar
        </button>
        <p className='o'>O</p>
        <button className='button-duel room-button' onClick={onClick}>
          Crear Sala
        </button>
        {showIncorrectCode ? <p className='duel-incorrect-code-p'>Código incorrecto</p> : <></>}
      </div>
    
  );
};

export default DuelPlay;
