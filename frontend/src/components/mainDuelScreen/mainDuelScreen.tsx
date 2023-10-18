import React, { useState } from 'react';
import { PATH } from '../../constants';
import axios from 'axios';

const MainDuelScreen: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJoZXJuYW4iLCJpYXQiOjE2OTc2MzA3OTB9.X4OX_oy5d3rqHbBZlsL6iuHySavRDhWPGYzs8o1WYjA";
  const [roundsNumber, setRoundsNumber] = useState<number>(3);
  const userId = 1;

  const handleGetNumber = () => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${PATH}/duel`,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        },
        data: {
            ownerId : userId,
            rounds: roundsNumber
        }
      };
  
      axios.request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetNumber = () => {
    const newNumber = parseInt(inputNumber, 10);
    if (!isNaN(newNumber)) {
      setNumber(newNumber);
      setResult(null);
    }
  };

  return (
    <div>
      <p>Current Number: {number}</p>
      <input
        type="number"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
      />
      <button onClick={handleSetNumber}>Set Number</button>
      <p>Result: {result !== null ? result : 'Click "Get Number" to retrieve a random number.'}</p>
      <button onClick={handleGetNumber}>Get Number</button>
    </div>
  );
};

export default MainDuelScreen;
