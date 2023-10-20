import React, { useState } from 'react';
import { PATH } from '../../constants';
import axios from 'axios';

const MainDuelScreen: React.FC = () => {
    const [number, setNumber] = useState(0);
    const [inputNumber, setInputNumber] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY5NzgyOTI3NX0.-ilzc67Dgfi-lj6DfNqMencZWf4z9FBjAMvvCX9MZYs"
    const [roundsNumber, setRoundsNumber] = useState<number>(3);
    const userId = 1;
    const [duelId, setDuelId] = useState<string>('');

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
                id : userId,
                rounds: roundsNumber
            }
        };
    
        

        /*let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${PATH}/duel/dM0ge`,
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
                },
        }; */

        axios.request(config)
        .then((response) => {
            setDuelId(response.data.newDuel.id);
            console.log(response.data.newDuel.id);
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
