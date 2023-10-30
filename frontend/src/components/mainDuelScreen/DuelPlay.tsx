import React, { useState } from 'react';
import './DuelPlay.css';

interface DuelPlayProps{
  onClick: () => void
  onSubmit: () => void
  setDuelId: (id : string) => void
}

const DuelPlay: React.FC<DuelPlayProps> = ({onClick, onSubmit, setDuelId}) => {
  

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
      </div>
    
  );
};

export default DuelPlay;
