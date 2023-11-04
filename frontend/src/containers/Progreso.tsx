import React, { useState } from 'react';
import './Progreso.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { PATH } from '../constants';
import rocket from '../assets/continue_rocket.png'
import insigna from '../assets/insigna.png'
import PopupMessage from '../components/popUpMessage/PopUpMessage';

const Progreso: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const options = ['1 Primaria', '2 Primaria', '3 Primaria', '4 Primaria', '5 Primaria', '6 Primaria', '1 Secundaria', '2 Secundaria', '3 Secundaria', '4 Secundaria', '5 Secundaria', '6 Secundaria', 'GAL1 Universidad', 'GAL2 Universidad', 'AM1 Universidad', 'AM2 Universidad','AM3 Universidad', 'PyE Universidad'];
  const [emptyDropBox, setEmptyDropBox] = useState<boolean>(false);

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

  const handleChangeGalaxy = () => {
    if (selectedOption){
      //Abrir galaxia especificada en selectedOption
    }else{
      //Empty selection
      setEmptyDropBox(true);
    }
  }

  const closePopUpEmptyDropBox = () => {
    setEmptyDropBox(false);
  }

  return (
    <>
    <div className="space-screen">
      <NavBar showButtons={false}/>
      <div className="my-progress-card-container">
        <div className="progress-card-container">
          <h2 className='progress-card-title'>Continuar mi progreso</h2>
          <p className='progress-card-body'>Completa los distintos mundos dentro de tu año escolar, resulve todos los ejercicios y avanza de nivel hasta terminar con todos los desafios.</p>
          <p className='progress-card-body'>Apreta el boton continuar para navegar hacia la seleccion de mundos.</p>
          <p className='progress-card-body'>¡Te estoy esperando!</p>
          <div className="progress-continue-btn" onClick={handleContinue}>
            <p className='progress-continue-txt'>Continuar</p>
            <img src={rocket} alt='Rocket Img' className='progress-continue-img'/>
          </div>
        </div> 
      </div>
      <div className="change-progress-card-container">
        <div className="progress-card-container">
          <h2 className='progress-card-title'>Descubrir nuevos mundos</h2>
          <p className='progress-card-body'>Aventurate en nuevos retos y desafiate en otros años escolares, accede a ejercicios de diferente dificultad, no pares hasta completarlos.</p>
          <p className='progress-card-body'>Selecciona el año que quieras descubir y apreta el boton jugar ahora.</p>
          <p className='progress-card-body'>¿Te animas?</p>
          <div className='footer-progress-playnow'>
            <select className='progress-playnow-drop-box' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">Selecciona un año</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="progress-continue-btn" onClick={handleChangeGalaxy}>
              <p className='progress-playnow-txt'>Jugar Ahora</p>
              <img src={insigna} alt='Rocket Img' className='progress-playnow-img'/>
            </div>
          </div>
        </div>
      </div>
      {emptyDropBox && <PopupMessage onClose={closePopUpEmptyDropBox} title='Año escolar vacio' body='Para poder acceder a este modo de juego se requiere seleccionar una opcion valida para el año escolar al que se quiera jugar. Vuelva a intentar.'/>}
    </div>
    </>
  );
};

export default Progreso;


