import React, { useState } from 'react';
import { PATH } from '../../constants';
import axios from 'axios';
import DuelPlay from './DuelPlay';
import './MainDuelScreen.css';
import NavBar from '../NavBar';
import DuelSelect from './DuelSelect';

const MainDuelScreen: React.FC = () => {
    const [number, setNumber] = useState(0);
    const [inputNumber, setInputNumber] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJoZXJuYW4iLCJpYXQiOjE2OTgwNjEwNDZ9.fMyl_OUTHORE-W6wOJRW8Z4XE4fpiGJtBfVdT9ziV0g"
    const [roundsNumber, setRoundsNumber] = useState<number>(3);
    const userId = 1;
    const [duelId, setDuelId] = useState<string>('');
    const [showPlay, setShowPlay] = useState(true);
    const [showIncorrectCode, setShowIncorrectCode] = useState(false);

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

    const enterRoom = (room:string) => {
        console.log(room);
    }

    return (
        // <div>
        // <p>Current Number: {number}</p>
        // <input
        //     type="number"
        //     value={inputNumber}
        //     onChange={(e) => setInputNumber(e.target.value)}
        // />
        // <button onClick={handleSetNumber}>Set Number</button>
        // <p>Result: {result !== null ? result : 'Click "Get Number" to retrieve a random number.'}</p>
        // <button onClick={handleGetNumber}>Get Number</button>
        <>
            <NavBar showButtons={false}/>
            <div className='main-duel-screen-container'>
                {showPlay ? <DuelPlay onClick={() => setShowPlay(false)} onSubmit = {() => enterRoom(duelId)} setDuelId={setDuelId}/> : <DuelSelect onClick={() => setShowPlay(true)}/>} 
            </div>
        </>
    );
};

export default MainDuelScreen;
