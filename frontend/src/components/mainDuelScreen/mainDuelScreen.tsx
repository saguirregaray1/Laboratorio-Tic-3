import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '../../constants';
import axios from 'axios';
import DuelPlay from './DuelPlay';
import './MainDuelScreen.css';
import NavBar from '../NavBar';
import DuelSelect from './DuelSelect';

const MainDuelScreen: React.FC = () => {
    const [id, setId] = useState<string>('');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY5ODE1OTYwMX0.gooCcAbIdZvI2OeDEFM-BjGGueaIVeu5epYQnpuPOsM"
    const [roundsNumber, setRoundsNumber] = useState<number>(3);
    const userId = 1;
    const [duelId, setDuelId] = useState<string>('');
    const [showPlay, setShowPlay] = useState(true);
    const [showIncorrectCode, setShowIncorrectCode] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        console.log(difficulty);
        console.log(roundsNumber);
    }

    const handleCreateDuel = () => {
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
                rounds: roundsNumber,
                universe: 'Primaria',
                galaxy: '1'
            }
        };

        axios.request(config)
        .then((response) => {
            setDuelId(response.data.newDuel.id);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const enterRoom = (room:string) => {
        console.log(room);
    }

    const handleJoinDuel = () => {
        setDuelId(id)
    };

    useEffect(() => {
        if (duelId !== '') {
            navigate(`/duel/${duelId}`, {state:{token: token, userId: userId, duelId: duelId}})
        }
    },[duelId]);

    return (
        <>
            <NavBar showButtons={false}/>
            <div className='main-duel-screen-container'>
                {showPlay ? <DuelPlay onClick={() => setShowPlay(false)} onSubmit = {() => enterRoom(duelId)} setDuelId={setDuelId}/> : <DuelSelect onClick={() => setShowPlay(true)} setRoundNumber={setRoundsNumber} setDifficulty={setDifficulty} createRoom={createRoom}/>} 
            </div>
        </>
    );
};

export default MainDuelScreen;
