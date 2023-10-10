import React from 'react';
import './SlideInElement.css';

interface SlideInElementProps {
  title: string;
  paragraph: string;
  style: string;
}

const SlideInElement: React.FC<SlideInElementProps> = ({ title, paragraph, style }) => {
  return (
    <div className={style}>
      <h1>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default SlideInElement;
