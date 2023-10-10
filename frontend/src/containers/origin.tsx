import React, { useState } from "react";
import NavBar from "../components/NavBar";
import praderaImage from '../assets/pradera.jpg';
import duelosImage from '../assets/duelos.jpg';
import triviaImage from '../assets/trivia.jpg';
import './styles.css'

function Origin() {

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /*const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 9999,
    pointerEvents: 'auto' as 'auto',
  };

  const modalStyles: React.CSSProperties = {
    zIndex: 1000, 
  };*/

  return (

    <>

      <NavBar openModal={openModal} showButtons={true}/>

      <div className='container-fluid' style={{ margin: '20px'}}>

        <div className='row'>

          <div className='col-4'>

            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>

              <img src={triviaImage} className="card-img-top" alt="Imagen de carta" />

              <div className="card-body">

                <h5 className="card-title">Trivia</h5>

                <p className="card-text">Desafiate intentando hacer numerosos e ingeniosos problemas de matematicas segun tu nivel.</p>

                <a className="btn btn-primary">Leer más</a>

              </div>

            </div>

          </div>

          <div className='col-4'>

            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>

              <img src={praderaImage} className="card-img-top" alt="Imagen de carta" />

              <div className="card-body">

                <h5 className="card-title">Historia</h5>

                <p className="card-text">Diferentes mundos con distintos problemas esperan para poner a prueba tu nivel y avanzar hasta el final.</p>

                <a className="btn btn-primary">Leer más</a>

              </div>

            </div>

          </div>

          <div className='col-4'>

            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '20rem' }}>

              <img src={duelosImage} className="card-img-top" alt="Imagen de carta" />

              <div className="card-body">

                <h5 className="card-title">Duelos</h5>

                <p className="card-text">Juega y diviertete con amigos y personas online, desafialos a distinos modos de juego.</p>

                <a className="btn btn-primary">Leer más</a>

              </div>

            </div>

          </div>

        </div>

      </div>

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
                <input type="email" id="defaultForm-email" className="form-control validate" />
              </div>

              <div className="md-form mb-4">
                <i className="fas fa-lock prefix grey-text"></i>
                <label data-error="wrong" data-success="right">Contraseña</label>
                <input type="password" id="defaultForm-pass" className="form-control validate" />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button className="btn btn-primary" onClick={closeModal}>Iniciar sesion</button>
            </div>
          </div>
        </div>
      </div>

    </>

  );

}

 

export default Origin;

 