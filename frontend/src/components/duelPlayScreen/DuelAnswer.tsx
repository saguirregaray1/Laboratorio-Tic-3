import React, {useState} from 'react';
import './DuelAnswer.css'
import isCorrectImg from '../../assets/question_resolved.png'
import isIncorrectImg from '../../assets/wrong_question.png'

interface DuelAnswerProps{
    isCorrect: boolean
}

const DuelAnswer: React.FC<DuelAnswerProps> = ({isCorrect}) => {

    console.log(isCorrect)

    return (
        <div className='duel-answer-container' >
            <div className='correct-container'>
                <p className='duel-answer-p'>{isCorrect ? 'Correcto' : 'Incorrecto'}</p>
                <div className='duel-answer-image-container'>
                    <img className='duel-image' src={isCorrect ? isCorrectImg : isIncorrectImg}></img>
                </div>
                <p className='duel-answer-p waiting-answer-p'>Esperando jugadores...</p>
            </div>
        </div>
    )
}

export default DuelAnswer; 