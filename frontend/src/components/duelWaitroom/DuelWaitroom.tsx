import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './DuelWaitroom.css'
import { PATH } from "../../constants";
import io from 'socket.io-client';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import WebSocketService from "../WebSocketService";




const DuelWaitroom: React.FC = () => {

    const [users, setUsers] = useState<string[]>([]);
    const [readys, setReadys] = useState<string[]>([]);
    
    const location = useLocation();
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [roomId, setRoomId] = useState(location.state.duelId);

    useEffect(() => {
        const wsService = WebSocketService.getInstance();
        wsService.connect(localStorage.getItem('token') || '');

        const socket = wsService.getSocket();

        if (socket){

            socket.emit('join', location.state.duelId);

            socket.on('users', (data: any) => {
                setUsers(data);
            });   

            socket.on('usersReady', (data: any) => {
                setReadys(data)
            });

            socket.on('duelStarted', (data: any) => {
                navigate(`/duel/play/${location.state.duelId}`, {state:{duelId: location.state.duelId, question: data}})
            });
        }
    }, []);

    const handleReady= () => {
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            socket.emit('ready', location.state.duelId);
            setIsReady(true);
        }
    };

    const handleStart = () => {
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            socket.emit('start', location.state.duelId)
            setHasStarted(true);
        }
    }


    return (
        <>
        <NavBar showButtons={true}/>
        <div className="waitroom-container">
            <p className="waiting-room-p">Código de la sala: {roomId}</p>
            <div className="buttons-container">
                <button className="waitroom-button" onClick={handleReady}>Listo</button>
                <button className="waitroom-button" onClick={handleStart} disabled={location.state.ownerId != localStorage.getItem('userId')}>Comenzar</button>
            </div>

            <div className="players-container">
                <p className="waiting-room-p">Esperando jugadores...</p>
                <ul className="players-list">
                    {users.map((user:any) => (
                            <li className="player">
                                <div className="player-name">{user}</div>
                                <div className="player-ready">
                                    {readys.includes(user) ? 
                                    <FontAwesomeIcon icon={faCheck} size="xl" style={{color: "#16df19",}} /> :
                                    <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#f50f0f",}} />}
                                </div>
                                
                            </li>                     
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default DuelWaitroom;