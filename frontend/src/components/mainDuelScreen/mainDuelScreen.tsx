import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH } from '../../constants';
import axios from 'axios';

const MainDuelScreen: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY5NzgzOTg1Nn0.lXUHJB-R24Te9PFvriceK_eZJKoZQ5lW035jPPS0p3k"
    const [roundsNumber, setRoundsNumber] = useState<number>(3);
    const userId = 1;
    const [duelId, setDuelId] = useState<string>('');
    const navigate = useNavigate();

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
        }; /*/

        axios.request(config)
        .then((response) => {
            setDuelId(response.data.newDuel.id);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleJoinDuel = () => {
        setDuelId(id)
    };

    useEffect(() => {
        if (duelId !== '') {
            navigate(`/duel/${duelId}`, {state:{token: token, userId: userId, duelId: duelId}})
        }
    },[duelId]);

    return (
        <div>
        <>{duelId}</>
        <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleJoinDuel}>Join Duel</button>
        <button onClick={handleCreateDuel}>Create Duel</button>
        </div>
    );
};

export default MainDuelScreen;
