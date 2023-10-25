import React, { useState } from 'react';
import './Progreso.css';
import spaceBackground from '../assets/rocket-background.jpg'
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/customButton/customButton';

const Progreso: React.FC = () => {
  const [year, setYear] = useState<string>('1');
  const [course, setCourse] = useState<string>('Primaria');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/history/galaxy')
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleYearSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
    setCourse(option);
  };

  const handleCourseSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false); 
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



const yearOptions: string[] = ['Primaria', 'Secundaria', 'Universidad'];
const collegeOptions: string[] = ['Analisis 1', 'Analisis 2', 'Analisis 3', 'GAL 1', 'GAL 2', 'PYE'];

const generateYearButtons = (options: string[]) => {
  return options.map((option, index) => (
    <button key={index} onClick={() => handleYearSelect(option)}>
      {option}
    </button>
  ));
};

const generateCollegeButtons = (options: string[]) => {
  return options.map((option, index) => (
    <button key={index} onClick={() => handleCourseSelect(option)}>
      {option}
    </button>
  ));
};


  return (
    <div className="space-screen" style={{ backgroundImage: `url(${spaceBackground})` }}>
      <div className="content">
        <div className="student-info">
          <h1>{year} - {course}</h1>
        </div>
        <div className='body'>
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
               {generateYearButtons(yearOptions)}
             </div>
            )}
          </div>
          <div className='dropdown-container'>
            <CustomButton
            label='Cambiar Curso'
            color='#14213d'
            onClick={handleDropdownClick}/>
            {showDropdown &&  ( (course === 'Primaria' || course === 'Secundaria') &&
              <div className="dropdown-menu">
                {generateButtons()}
              </div>
            )}
            {showDropdown &&  (course === 'Universidad' &&
              <div className="dropdown-menu">

                {generateCollegeButtons(collegeOptions)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Progreso;


