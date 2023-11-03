import React, { useEffect, useState } from "react";
import praderaImage from '../assets/pradera.jpg';
import duelosImage from '../assets/duelos.jpg';
import triviaImage from '../assets/trivia.jpg';
import Card from "../components/card/Card";
import "../containers/styles.css"
import Footer from "../components/footer/Footer";
import Swiper from "../components/swiper/Swiper";
import SlideInElement from "../components/slidein/SlideInElement";
import NavBar from "../components/NavBar";
import { useNavigate, useLocation } from 'react-router';


function FirstPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token,setToken] = useState<string>('')



    const handleClickHistory = () => {
        if (localStorage.getItem('token')){
            navigate('/progress')
        }
        //popup
    }

    const handleClickTrivia = () => {
        navigate('/trivia')
    }

    const handleClickDuelos = () => {
        if (localStorage.getItem('token')){
            navigate('/duel')
        }    
    }

    const items = [
        {
            imageSrc: 'https://cdn.langeek.co/photo/32620/original/',
            imageAlt: 'Dos punos'
        },
        {
            imageSrc: 'https://cdn-attachments.timesofmalta.com/161720d2d73196098f3bc7896777216ff157c89d-1651561144-5c8764f4-960x640.jpg',
            imageAlt: 'Imagen de una pradera'
        },
        {
            imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6t29C0TxDMrwXSRcjjd8SEal_NJtb-4uhiA&usqp=CAU',
            imageAlt: 'Trivia',
        },
    ]
    return(
        <>
            <NavBar showButtons={true}/>
            <div className="card-container">
                <Card title="Historia"
                text="Diferentes mundos con distintos problemas esperan para poner a prueba tu nivel y avanzar hasta el final."
                imageSrc={praderaImage}
                color="#fdf0d5"
                font="Courier"
                isDisabledBtn= {false}
                onClick={handleClickHistory}/>

                <Card title="Trivia"
                text="Llego tu momento de entrenar. Resove distintas preguntas de todos los niveles."
                imageSrc={triviaImage}
                color="#fdf0d5"
                font="Courier"
                isDisabledBtn= {false}
                onClick={handleClickTrivia}/>

                <Card title="Duelos"
                text="Juega y diviertete con amigos y personas online. Invitalas a una sala en un desafio imperdible."
                imageSrc={duelosImage}
                color="#fdf0d5"
                font="Courier"
                isDisabledBtn= {false}
                onClick={handleClickDuelos}/>           
            </div> 
            {/* <div className="container-wavy">
                <SlideInElement
                style= "slide-in-element"
                title="Historia"
                paragraph="Este modo de juego es..."/>
            </div>
            <div className="container-wavy-inverted">
                <SlideInElement
                style="slide-in-element-inverted"
                title="Trivia"
                paragraph="Este modo de juego es..."/>
            </div>
            <div className="container-wavy">
                <SlideInElement
                style="slide-in-element"
                title="Duelos"
                paragraph="Este modo de juego es..."/>
            </div>
            <div className="container">
                <h1>Estas Preparado para el desafío?</h1>
                <Swiper items={items} />
            </div> */}
            <Footer 
            aboutText="Somos un grupo de estudiantes de la Universidad de Montevideo que buscamos revolucionar el mundo de la educación." 
            contactText="florida@correo.um.edu.uy" 
            copyrightText="©Copyright 2023 Florida. All Rights Reserved."
            />
        </>
    );
       

}

export default FirstPage;