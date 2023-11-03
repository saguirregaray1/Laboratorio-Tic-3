import React from 'react'
import './PopUpMessage.css'
import warning from '../../assets/warning.png'

interface PopupMessageProps {
    onClose: () => void;
    title: string;
    body: string;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ onClose, title, body }) => {
  
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content">
            <div className="popup-title-container">
                <img src={warning} alt="Warning" className='popup-title-img'/>
                <h2 className='popup-title-text'>{title}</h2>
            </div>
            <p className='popup-content-text'>{body}</p>
            <button className="close-popup-btn" onClick={onClose}>Entendido</button>
        </div>
      </div>
    );
  };
  
  export default PopupMessage;