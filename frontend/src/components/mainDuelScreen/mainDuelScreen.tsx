import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '../../constants';
import axios from 'axios';
import DuelPlay from './DuelPlay';
import './MainDuelScreen.css';
import NavBar from '../NavBar';
import DuelSelect from './DuelSelect';

const MainDuelScreen: React.FC = () => {
    const [roundsNumber, setRoundsNumber] = useState<number|null>(null);
    const [duelId, setDuelId] = useState<string>('');
    const [showPlay, setShowPlay] = useState(true);
    const [showIncorrectCode, setShowIncorrectCode] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const [isDataMissing, setIsDataMissing] = useState(false);
    const navigate = useNavigate();

    const handleSwitchPlayToCreate = () => {
        setShowPlay(false);
        setShowIncorrectCode(false);
        setDuelId('');
    }

    const handleSwitchCreateToPlay = () => {
        setShowPlay(true);
        setIsDataMissing(false);
        setDifficulty('');
        setRoundsNumber(null);
    }

    const createRoom = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${PATH}/duel`,
            headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type' : 'application/json'
            },
            data: {
                ownerId : localStorage.getItem('userId'),
                rounds: roundsNumber,
                universe: difficulty.split(' ')[1],
                galaxy: difficulty.split(' ')[0]
            }
        };

        axios.request(config)
        .then((response) => {
            setDuelId(response.data.newDuel.id);
            navigate(`/duel/wait/${response.data.newDuel.id}`, {state:{duelId: response.data.newDuel.id, ownerId: localStorage.getItem('userId')}})
        })
        .catch((error) => {
            setIsDataMissing(true);
        });
        
    }


    const enterRoom = (room:string) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${PATH}/duel/wait/${room}`,
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          };
      
          axios.request(config)
          .then((response) => {
                navigate(`/duel/wait/${duelId}`, {state:{duelId: response.data.resp.duelId, ownerId: response.data.resp.ownerId}})
          })
          .catch((error) => {
            setShowIncorrectCode(true);
            console.log(error);
          });
    }

    return (
        <>
            <NavBar showButtons={false}/>
            <div className='main-duel-screen-container'>
                {showPlay ? <DuelPlay onClick={handleSwitchPlayToCreate} onSubmit = {() => enterRoom(duelId)} setDuelId={setDuelId} showIncorrectCode={showIncorrectCode}/> : <DuelSelect onClick={handleSwitchCreateToPlay} setRoundNumber={setRoundsNumber} setDifficulty={setDifficulty} createRoom={createRoom} isDataMissing={isDataMissing}/>} 
            </div>
        </>
    );
};

export default MainDuelScreen;
