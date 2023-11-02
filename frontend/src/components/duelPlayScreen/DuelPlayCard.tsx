import React, {useState} from 'react';
import './DuelPlayCard.css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {darken} from 'polished'


interface DuelPlayCardProps{
    option: string,
    color: string,
    icon: IconDefinition,
    onClick: () => void; 
};

const DuelPlayCard: React.FC<DuelPlayCardProps> = ({option, color, icon, onClick}) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='duel-card-container' 
        style={{backgroundColor: isHovered ? darken(0.1, color) : color,}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}>
            {/* <div className='duel-card-icon'><FontAwesomeIcon icon={icon} size='2xl' style={{color: "white"}}/></div> */}
            <p className='duel-card-p'>{option}</p>
        </div>
    );
}
    
export default DuelPlayCard;