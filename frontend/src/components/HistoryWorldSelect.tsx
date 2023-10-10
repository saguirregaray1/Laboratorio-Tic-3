import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HistoryWorldSelect: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [wordls, setWordls] = useState<any[]>([])
    const handleUniverseSelect = (universe:string) => {
        navigate('/worlds');
    }

    useEffect(()=>{
        const data = JSON.stringify({
            "universe": '',
            "galaxy": ''
          });
      
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/v1/trivia/play',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
      
          axios.request(config)
          .then((response) => {
            const data = response.data.question
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])

    return (
        <div className="history-universe-select">
            {wordls.map((world) => (
            <div
                key={world}
                className='card'
                onClick={() => handleUniverseSelect(world)}
            >
                <h2>{world}</h2>
            </div>
            ))}
        </div>
    );
};

export default HistoryWorldSelect;
