import React from "react";
import praderaImage from '../assets/pradera.jpg';
import duelosImage from '../assets/duelos.jpg';
import triviaImage from '../assets/trivia.jpg';



function Origin() {

  return (

    <>

      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#284B63'}} >

        <div className="container-fluid">

          <a className="navbar-brand mb-0 h1">MathWorld</a>

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

          <div className="collapse navbar-collapse" id="navbarButtons">

            <ul className="navbar-nav ms-auto">

              <button type="button" className="btn" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}}>Iniciar sesion</button>

              <button type="button" className="btn btn-light" style={{margin:'5px', backgroundColor: '#FFFFFF', color: '#353535', fontWeight: 'bold', borderColor: '#353535', borderWidth: '2px'}}>Registrarse</button>

            </ul>

          </div>

        </div>

      </nav>

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

    </>

  );

}

 

export default Origin;

 