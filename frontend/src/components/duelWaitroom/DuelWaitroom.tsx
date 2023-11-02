import React, { useState } from "react";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './DuelWaitroom.css'



const DuelWaitroom: React.FC = () => {

    const [users, setUsers] = useState<string[]>(['hernan puschiasis', 'santiago aguirregaray','guzmi','scampa','Santiago Campanella']);
    const [readys, setReadys] = useState<string[]>(['hernan puschiasis']);
    const [roomId, setRoomId] = useState('ABC123');
    const [ownerId, setOwnerId] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    return (
        <>
        <NavBar showButtons={true}/>
        <div className="waitroom-container">
            <p className="waiting-room-p">Código de la sala: {roomId}</p>
            <div className="buttons-container">
                <button className="waitroom-button">Listo</button>
                <button className="waitroom-button">Comenzar</button>
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