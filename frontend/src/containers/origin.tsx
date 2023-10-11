import React, { useState } from "react";
import NavBar from "../components/NavBar";
import praderaImage from '../assets/pradera.jpg';
import duelosImage from '../assets/duelos.jpg';
import triviaImage from '../assets/trivia.jpg';
import './styles.css'

function Origin() {

  return (

    <>

      <NavBar showButtons={true}/>

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

 