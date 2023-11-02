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
    const [roundsNumber, setRoundsNumber] = useState<number>(3);
    const userId = 1;
    const [duelId, setDuelId] = useState<string>('');
    const [showPlay, setShowPlay] = useState(true);
    const [showIncorrectCode, setShowIncorrectCode] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {

        console.log('token', localStorage.getItem('token'));

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
            navigate(`/duel/${response.data.newDuel.id}`, {state:{duelId: response.data.newDuel.id}})
        })
        .catch((error) => {
            console.log(error);
        });
        
    }


    const enterRoom = (room:string) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${PATH}/duel/${room}`,
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          };
      
          axios.request(config)
          .then((response) => {
                if(response.status === 200)
                navigate(`/duel/${duelId}`, {state:{duelId: room}})
          })
          .catch((error) => {
            console.log(error);
          });



    }

    const handleJoinDuel = () => {
        setDuelId(id)
    };

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
