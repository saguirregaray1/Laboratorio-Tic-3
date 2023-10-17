import React, { useState } from 'react';
import planetChoice from '../../assets/planet_choice.png'
import './PlanetChoiceButton.css'

interface World {
    id: string;
    name: string;
}

const PlanetContainer: React.FC<{ world: World, handleWorldSelect: (world: World) => void }> = ({ world, handleWorldSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleWorldSelect(world)}
    >
      <img src={planetChoice} alt="Your Image" className={isHovered ? 'blur' : ''} />
      {isHovered && (
        <div className="overlay">
          <p>{world.name}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetContainer;