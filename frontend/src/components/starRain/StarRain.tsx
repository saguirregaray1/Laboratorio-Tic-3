// StarRain.tsx
import React from 'react';
import './StarRain.css';

const StarRain: React.FC<{ starCount: number }> = ({ starCount }) => {
  const stars = Array.from({ length: starCount }, (_, index) => {
    const style = {
      animationDelay: `${Math.random() * 2}s`,
      left: `${Math.random() * 100}%`,
    };
    return <div key={index} className="star" style={style}></div>;
  });

  return (
    <div className="star-rain-container">
      {stars}
    </div>
  );
};

export default StarRain;
