import React, { useState } from 'react';
import './Progreso.css';
import spaceBackground from '../assets/rocket-background.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../components/customButton/customButton';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { PATH } from '../constants';

const Progreso: React.FC = () => {
  const [year, setYear] = useState<string>('1');
  const [course, setCourse] = useState<string>('Primaria');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();



  const handleContinue = () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${PATH}/user/currentGalaxy/${localStorage.getItem('userId')}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    };

    axios.request(config)
    .then((response) => {
      const body = response.data
      navigate('/history/galaxy', {state: {galaxyId: body}})

    })
    .catch((error) => {
      console.log(error);
    });

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
    <>
    <NavBar showButtons={true}/>
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
          isDisabled= {false}
          onClick={handleContinue}/>
          <div className='dropdown-container'>
            <CustomButton
            label='Cambiar Año'
            color='#14213d'
            isDisabled= {false}
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
            isDisabled= {false}
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
    </>
  );
};

export default Progreso;


