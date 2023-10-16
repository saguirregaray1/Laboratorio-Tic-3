import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PATH } from '../../constants';

const HistoryWorldSelect: React.FC = () => {
    const [worlds, setWorlds] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state.token;
    const userId = location.state.userId;
    const handleWorldSelect = (world:any) => {
        navigate('/history/world', {state:{worldId: world.id, token: token, userId: userId}})
    }

    useEffect(() => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${PATH}/history/galaxy/getworlds/${location.state.galaxyId}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          },
        };
    
        axios.request(config)
        .then((response) => {
            console.log(response.data);
            setWorlds(response.data.worlds);
            setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);

    return (
        <>
            {isLoading ? 'Loading...' : 
                <div className='worlds-container'>
                {worlds.map((world) => (
                    <div key={world.id} className="card" onClick={() => handleWorldSelect(world)}>
                        <h2>{world.name}</h2>
                    </div>
                ))};
                </div>
            }
        </>
    );
};

export default HistoryWorldSelect;