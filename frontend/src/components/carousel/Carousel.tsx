import React, { useState } from "react";
import "../carousel/styles.css"

interface CarouselProps {
    items: React.ReactNode[];
  }
  
  const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="carousel">
        <button className="carousel-button" onClick={prevSlide}>
          Prev
        </button>
        <div className="carousel-slide">
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentIndex ? 'active' : 'translate'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <button className="carousel-button" onClick={nextSlide}>
          Next
        </button>
      </div>
    );
  };
  
  export default Carousel;