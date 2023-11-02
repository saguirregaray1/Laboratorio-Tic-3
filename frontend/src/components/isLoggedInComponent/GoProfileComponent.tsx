import React from 'react';
import './GoProfileComponent.css'
import myBook from '../../assets/myBook.png'
import profile from '../../assets/default_profile.jpg'
import logOut from '../../assets/log_out.jpg'

interface GoProfileProps {
    onClickMyNotes: () => void;
    onClickMyProfile: () => void;
    onClickCloseSession: () => void;
}

const GoProfileComponent: React.FC<GoProfileProps> = ({onClickMyNotes,onClickMyProfile, onClickCloseSession}) => {

    return (
        <div className="content-container-gpc">
            <div className="container-buttons-gpc" onClick={onClickMyNotes}>
                <p className='txt-buttons-gpc'>Mi cuaderno</p>
                <img src={myBook} alt="Notebook Icon" className="img-my-notes"/>
            </div>
            <div className="container-buttons-gpc" onClick={onClickMyProfile}>
                <p className='txt-buttons-gpc'>Mi perfil</p>
                <img src={profile} alt="Profile Icon" className="img-my-profile"/>
            </div>
            <div className='log-out-container' onClick={onClickCloseSession}>
                <img src={logOut} alt='Log Out' className='img-log-out'/>
            </div>
        </div>
    );
};

export default GoProfileComponent;