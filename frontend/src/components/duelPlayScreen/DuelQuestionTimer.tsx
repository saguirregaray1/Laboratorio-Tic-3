import React, { useEffect, useState } from "react";
import './DuelQuestionTimer.css';

interface DuelQuestionTimerProps{
    handleTimeout: () => void;
}

const DuelQuestionTimer: React.FC<DuelQuestionTimerProps> = ({handleTimeout}) => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (seconds > 0) {
        interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        } else if (seconds === 0) {
            handleTimeout();
        }

        return () => {
        if (interval) {
            clearInterval(interval);
        }
        };
    }, [seconds]);


    return (
        <div className="seconds-remaining-container">{seconds}</div>
    );
}

export default DuelQuestionTimer;