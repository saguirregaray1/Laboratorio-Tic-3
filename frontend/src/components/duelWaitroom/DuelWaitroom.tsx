import React, { useState } from "react";
import NavBar from "../NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './DuelWaitroom.css'



const DuelWaitroom: React.FC = () => {

    const [users, setUsers] = useState<string[]>(['hernan', 'santi']);
    const [readys, setReadys] = useState<string[]>(['hernan']);

    return (
        <>
        <NavBar showButtons={true}/>
        <div className="waitroom-container">
            <div className="users-container">
                {users.map((user:any) => (
                        <div className="username">
                            {user}
                            {readys.includes(user) ? 
                            <FontAwesomeIcon icon={faCheck} size="xl" style={{color: "#16df19",}} /> :
                            <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#f50f0f",}} />}
                        </div>                     
                ))}
                
                {/* <div className="ready-column waitroom-column">
                    {users.map((user:any) => (
                        <div className="user-ready">{user.isReady ? 
                            <FontAwesomeIcon icon={faCheck} size="xl" style={{color: "#16df19",}} /> :
                            <FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#f50f0f",}} />}</div>                     
                    ))}
                </div> */}
                
            </div>
        </div>
        </>
    )
}

export default DuelWaitroom;