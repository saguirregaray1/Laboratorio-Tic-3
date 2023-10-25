import React, { useState } from 'react';
import './Progreso.css';
import spaceBackground from '../assets/rocket-background.jpg'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/customButton/customButton';

const Progreso: React.FC = () => {
  const [year, setYear] = useState<string>('1');
  const [course, setCourse] = useState<string>('Primaria');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(''); // Store the selected option
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/history/galaxy')
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown menu visibility
  };

  const handleYearSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown menu when an option is selected
    setCourse(option);
  };

  const handleCourseSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown menu when an option is selected
    setYear(option);
  };


  const generateButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 6; i++) {
      buttons.push(
        <button key={i} onClick={() => handleCourseSelect(String(i))}>
          {i}
        </button>
      );
    }
    return buttons;
  };
  

  return (
    <div className="space-screen" style={{ backgroundImage: `url(${spaceBackground})` }}>
      <div className="content">
        <div className="student-info">
          <h1>{year} - {course}</h1>
        </div>
        <div className="button-container">
          <CustomButton
          label='Continuar nivel'
          color='#14213d'
          onClick={handleContinue}/>
          <div className='dropdown-container'>
            <CustomButton
            label='Cambiar Año'
            color='#14213d'
            onClick={handleDropdownClick}/>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => handleYearSelect('Primaria')}>Primaria</button>
                <button onClick={() => handleYearSelect('Secundaria')}>Secundaria</button>
                <button onClick={() => handleYearSelect('Universidad')}>Universidad</button>
              </div>
            )}
          </div>
          <div className='dropdown-container'>
            <CustomButton
            label='Cambiar Curso'
            color='#14213d'
            onClick={handleDropdownClick}/>
            {showDropdown && (
              <div className="dropdown-menu">
                {generateButtons()}
                {/* Add more options as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progreso;



/*
<button onClick={handleContinue}>
  Continuar nivel
</button>



 <button onClick={handleDropdownClick} className='change-button'>
  Cambiar nivel
</button>
*/