import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import your CSS for styling

interface TimerProp{
    setTimerStopped: () => void;
}

const Timer: React.FC<TimerProp> = ({setTimerStopped}) => {
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setTimerStopped();
      
    }
    // } else if (interval) {
    //   clearInterval(interval);
    // }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds]);


  const getSpinningClass = () => {
    return isActive ? 'spinning' : '';
  };

  return (
    <div className="timer-container">
        <div className={`spinning-div ${getSpinningClass()}`}></div>
        <div className="static-number">{seconds}</div>
    </div>
  );
};

export default Timer;

