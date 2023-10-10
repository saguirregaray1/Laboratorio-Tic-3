import React from 'react';

interface NavBarProps {
    openModal? : () => void;
    showButtons: boolean;
}

const NavBar: React.FC<NavBarProps>  = ({ openModal, showButtons }) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#284B63'}} >

            <div className="container-fluid">

            <a className="navbar-brand mb-0 h1">MathCrush</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">

                <li className="nav-item active">

                    <a className="nav-link" href="#">Inicio</a>

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
    );
}

export default NavBar;