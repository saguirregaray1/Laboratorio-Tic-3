import React, { useEffect, useState } from 'react';
import LoadingPage from '../loadingPage/LoadingPage';
import io from 'socket.io-client';
import { useLocation } from 'react-router';


const DuelPlayScreen: React.FC = () => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [answer, setAnswer] = useState<string>('');
    const [userList, setUserList] = useState<string[]>([]);
    const [readyList,setReadyList] = useState<string[]>([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTY5ODIzMjMzNH0.HaHW1VUXMkYq8au4N5gUdM77UYdLL1CXSa9Hk-eBhmc"
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [question,setQuestion] = useState<string>('');
    const [result,setResult] = useState<string>('');

    const socket = io('http://localhost:8000', {
        auth: { token },
      });    
    const location = useLocation();


    const handleReadyClick = () => {
        console.log('ready');
        socket.emit('ready', location.state.duelId);
        setIsReady(true);
    };


    const handlePlayClick = () => {
        console.log('play');
        socket.emit('start', location.state.duelId)
        setIsPlaying(true);
    };

    const handleAnswerClick = () => {
        console.log('answer');
        socket.emit('answer', {duelId: location.state.duelId, answer: answer})
        setIsPlaying(true);
    };

    

  
    
    useEffect(() => {
        socket.emit('join', location.state.duelId);

        socket.on('userJoined', (room: string) => {
            console.log(`Joined room ${room}`);
          });

        socket.on('users', (data: any) => {
            setUserList(data)
        });   

        socket.on('usersReady', (data: any) => {
            console.log('usersReady');
            setReadyList(data)
        });

        socket.on('duelStarted', (data: any) => {
            console.log('duelStarted');
            console.log(data);
            setQuestion(data)
        });

        socket.on('questionAnswered', (data: any) => {
            setAnswer(data)
        });

        socket.on('question', (data: any) => {
            setQuestion(data)
        });
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
        <button onClick={handleAnswerClick} disabled={!isReady || !isPlaying}>
            Answer
        </button>
        <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
        />
        <ul>
            {userList.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <ul>
            {readyList.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        <ul>
            {question}
        </ul>
        <ul>
            {result}
        </ul>
    </div>}
    </>
    ); 
};

export default DuelPlayScreen;
