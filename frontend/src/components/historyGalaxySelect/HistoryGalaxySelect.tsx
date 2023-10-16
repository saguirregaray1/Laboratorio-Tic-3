import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PATH } from '../../constants';

const HistoryGalaxySelect: React.FC = () => {
    const [galaxies, setGalaxies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state.token;
    const userId = location.state.userId;
    const handleGalaxySelect = (galaxy:any) => {
        navigate('/history/galaxy', {state:{galaxyId: galaxy.id, token: token, userId}})
    }

    useEffect(() => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${PATH}/history/galaxies/${location.state.universe}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          },
        };
    
        axios.request(config)
        .then((response) => {
            setGalaxies(response.data.galaxies)
            setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }, []);

    return (
        <>
            {isLoading ? 'Loading...' : 
                <div className='galaxies-container'>
                {galaxies.map((galaxy) => (
                    <div key={galaxy.id} className="card" onClick={() => handleGalaxySelect(galaxy)}>
                        <h2>{galaxy.name}</h2>
                    </div>
                ))};
                </div>
            }
        </>
    );
};

export default HistoryGalaxySelect;