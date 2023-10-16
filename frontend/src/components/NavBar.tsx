import React, { useState } from 'react';
import { useRef } from 'react';

interface NavBarProps {
    showButtons: boolean;
}

const NavBar: React.FC<NavBarProps>  = ({ showButtons }) => {    

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleLogin = () => {
        if (emailRef.current && passwordRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
        
            const userData = {
            email: email,
            password: password,
            };
        
            fetch('/your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            })
            .then((response) => {
                if (response.ok) {
                
                } else {
                    console.error('The responde of the login request was not ok');
                }
            })
            .catch((error) => {
                console.error('Something was worng with the login request');
            });
        } else {
            console.error('Ref objects are not properly initialized.');
          }
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

            {showButtons && (
            <div className="collapse navbar-collapse" id="navbarButtons">

                <ul className="navbar-nav ms-auto">

                <button type="button" className="btn" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}} onClick={openModal}>Iniciar sesion</button>

                <button type="button" className="btn btn-light" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}}>Registrarse</button>

                </ul>

            </div>
            )}

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
                    <label data-error="wrong" data-success="right">Correo electronico</label>
                    <input type="email" id="defaultForm-email" className="form-control validate" ref={emailRef} />
                    </div>

                    <div className="md-form mb-4">
                    <i className="fas fa-lock prefix grey-text"></i>
                    <label data-error="wrong" data-success="right">Contraseña</label>
                    <input type="password" id="defaultForm-pass" className="form-control validate" ref={passwordRef} />
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesion</button>
                </div>
                </div>
            </div>
        </div>
</>
    );
}

export default NavBar;