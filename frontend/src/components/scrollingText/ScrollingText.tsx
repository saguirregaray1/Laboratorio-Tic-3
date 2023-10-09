import React from "react";
import "../scrollingText/styles.css"
import { useState, useEffect } from "react";

const ScrollingText: React.FC = () => {
    const [currentColor, setCurrentColor] = useState<string>('#3498db');
  
    useEffect(() => {
      const colors = ['#ffea00', '#ffdd00', '#ffd000', '#ffc300'];
  
      let currentIndex = 0;
  
      const interval = setInterval(() => {
        setCurrentColor(colors[currentIndex]);
        currentIndex = (currentIndex + 1) % colors.length;
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="animation-container" style={{ backgroundColor: currentColor }}>
      </div>
    );
  };
  
  
export default ScrollingText;
  
