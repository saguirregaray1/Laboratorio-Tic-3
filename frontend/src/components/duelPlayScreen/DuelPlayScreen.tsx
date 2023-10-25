import React, { useEffect, useState } from 'react';
import LoadingPage from '../loadingPage/LoadingPage';
import io from 'socket.io-client';
import { useLocation } from 'react-router';


const DuelPlayScreen: React.FC = () => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [list, setList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [socket, setSocket] = useState<any>(null);
    const location = useLocation();


    const handleReadyClick = () => {
        setIsReady(true);
    };


    const handlePlayClick = () => {
        setIsPlaying(true);
    };

    

  
    
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        newSocket.on('connect', () => {
            console.log('connected')
            socket.emit('join', location.state.duelId)
        });
        newSocket.on('users', (data: any) => {
            setList(data);
        });   
        setSocket(newSocket);
        setIsLoading(false);

    }, []);


    return (
        <>
     {isLoading ? <LoadingPage /> : 
     <div>
        <button onClick={handleReadyClick} disabled={isReady}>
            Ready
        </button>
        <button onClick={handlePlayClick} disabled={!isReady || isPlaying}>
            Play
        </button>
        <ul>
            {list.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>}
</>
        
    );
};

export default DuelPlayScreen;
