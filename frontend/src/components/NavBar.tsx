import React, { useState } from 'react';
import { useRef } from 'react';
import {PATH} from '../constants';
import axios from 'axios'

interface NavBarProps {
    showButtons: boolean;
}
//TODO: Revisar el registrar que esta raro
const NavBar: React.FC<NavBarProps>  = ({ showButtons }) => {    

    const [isModalOpen, setModalOpen] = useState(false);
    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const options = ['1 Primaria', '2 Primaria', '3 Primaria', '4 Primaria', '5 Primaria', '6 Primaria', '1 Secundaria', '2 Secundaria', '3 Secundaria', '4 Secundaria', '5 Secundaria', '6 Secundaria', 'GAL1 Universidad', 'GAL2 Universidad', 'AM1 Universidad', 'AM2 Universidad','AM3 Universidad', 'PyE Universidad'];
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') == null); 
    const [incorrectRegister, setIncorrectRegister] = useState(false);
    const [isDataMissing, setIsDataMissing] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openRegistrationModal = () => {
        setRegistrationModalOpen(true);
    };

    const closeRegistrationModal = () => {
        setIncorrectRegister(false);
        setRegistrationModalOpen(false);
    };


    const handleLogin = (username:string, password:string) => {
        if (username != '' && password != '') {
            setIsDataMissing(false);
            
            
            const userData = JSON.stringify({
                password: password,
                username: username,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${PATH}/user/login`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : userData
              };

              axios.request(config)
              .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                setIsLoggedIn(false);
                setUsername('');
                setPassword('');
                closeModal();
              })
              .catch((error) => {
                setIncorrectRegister(true);
              });   
        }
        else{
            console.log('Faltan datos')
        }
        
    };

    const handleRegistration = () => {   
        if (registerEmail != '' && registerUsername != '' && selectedOption && registerPassword != '') {
            setIsDataMissing(false);

            const userData = JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                username: registerUsername,
                course: selectedOption,
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${PATH}/user/signup`,
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : userData
              };

            axios.request(config)
              .then((response) => {
                handleLogin(registerUsername, registerPassword);
                closeRegistrationModal();
              })
              .catch((error) => {
                setIncorrectRegister(true);
              });   
          
            //closeRegistrationModal();
        } else {
            setIsDataMissing(true);
        }
        
        //closeRegistrationModal();
    };         

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#284B63'}} >

                <div className="container-fluid">

                <a className="navbar-brand mb-0 h1">MathCrush</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mr-auto">

                    <li className="nav-item active">

                        <a className="nav-link" href="/">Inicio</a>

                    </li>

                    <li className="nav-item">

                        <a className="nav-link" href="#">¿Como jugar?</a>

                    </li>

                    <li className="nav-item">

                        <a className="nav-link" href="#">¿Quienes somos?</a>

                    </li>

                    </ul>

                </div>

                <div className="collapse navbar-collapse" id="navbarButtons">
                    <>{!isLoggedIn ? localStorage.getItem('userId') : <ul className="navbar-nav ms-auto">
                                                <button type="button" className="btn" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}} onClick={openModal}>Iniciar sesion</button>
                                                <button type="button" className="btn btn-light" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}} onClick={openRegistrationModal}>Registrarse</button>
                                                </ul>}</>    
                    

                </div>

                </div>

            </nav>

            {isModalOpen && <div className="overlay" onClick={closeModal}></div>}

            <div className={`modal fade ${isModalOpen ? 'show d-block' : ''} modal`} id="modalLoginForm" tabIndex={isModalOpen ? -1 : undefined} role="dialog" aria-labelledby="myModalLabel" aria-hidden={!isModalOpen}>
                <div className="modal-dialog modal-dialog-center" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Ingresa tus datos</h4>
                        <button type="button" className="btn btn-outline-secondary" onClick={closeModal} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body mx-3">
                        <div className="md-form mb-5">
                        <i className="fas fa-envelope prefix grey-text"></i>
                        <label data-error="wrong" data-success="right">Nombre de usuario</label>
                        <input type="text" id="defaultForm-email" className="form-control validate" onChange={(e) => {setUsername(e.target.value)}}/>
                        </div>
                        <div className="md-form mb-4">
                        <i className="fas fa-lock prefix grey-text"></i>
                        <label data-error="wrong" data-success="right">Contraseña</label>
                        <input type="password" id="defaultForm-pass" className="form-control validate" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={() => handleLogin(username, password)}>Iniciar sesion</button>
                    </div>
                    {incorrectRegister ? <p>Email o contraseña incorrectos.</p> : ''}
                    </div>
                </div>
            </div>

            {isRegistrationModalOpen && (
                <>
                    <div className="overlay" onClick={closeRegistrationModal}></div>
                    <div
                        className={`modal fade ${isRegistrationModalOpen ? 'show d-block' : ''} modal`}
                        id="modalRegistrationForm"
                        tabIndex={isRegistrationModalOpen ? -1 : undefined}
                        role="dialog"
                        aria-labelledby="myModalLabel"
                        aria-hidden={!isRegistrationModalOpen}
                    >
                        <div className="modal-dialog modal-dialog-center" role="document">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h4 className="modal-title w-100 font-weight-bold">Complete sus datos</h4>
                                    <button type="button" className="btn btn-outline-secondary" onClick={closeRegistrationModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body mx-3">
                                    <div className="md-form mb-5">
                                        <i className="fas fa-envelope prefix grey-text"></i>
                                        <label data-error="wrong" data-success="right">Correo electrónico</label>
                                        <input type="email" id="defaultForm-email" className="form-control validate" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
                                    </div>
                                    <div className="md-form mb-5">
                                        <i className="fas fa-user prefix grey-text"></i>
                                        <label data-error="wrong" data-success="right">Nombre de usuario</label>
                                        <input type="text" id="defaultForm-username" className="form-control validate" onChange={(e) => {setRegisterUsername(e.target.value)}}/>
                                    </div>
                                    <div className="md-form mb-4">
                                        <i className="fas fa-lock prefix grey-text"></i>
                                        <label data-error="wrong" data-success="right">Contraseña</label>
                                        <input type="password" id="defaultForm-pass" className="form-control validate" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
                                    </div>
                                    <div className="md-form mb-5">
                                        <label htmlFor="dropdown">Nivel educativo</label>
                                        <select id="dropdown" className="form-select" onChange={handleOptionChange}>
                                            <option value="" disabled selected>
                                                Elige una opción
                                            </option>
                                            {options.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {incorrectRegister ? <p>El email ya está registrado o la contraseña es muy débil.</p> : ''}
                                    {isDataMissing ? <p>Falta completar datos</p> : ''}
                                    

                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={handleRegistration}>
                                        Registrarse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default NavBar;