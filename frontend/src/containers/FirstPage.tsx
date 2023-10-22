import React from "react";
import praderaImage from '../assets/pradera.jpg';
import duelosImage from '../assets/duelos.jpg';
import triviaImage from '../assets/trivia.jpg';
import Card from "../components/card/Card";
import "../containers/styles.css"
import Footer from "../components/footer/Footer";
import Swiper from "../components/swiper/Swiper";
import SlideInElement from "../components/slidein/SlideInElement";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";


function FirstPage() {
    const navigate = useNavigate();

    const handleClickHistory = () => {
        navigate('/history');
    }

    const handleClickTrivia = () => {
        navigate('/trivia');
    }

    const handleClickDuelos = () => {
        navigate('/duel');
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
                onClick={handleClickHistory}/>

                <Card title="Trivia"
                text="Desafiate intentando hacer numerosos e ingeniosos problemas de matematicas segun tu nivel."
                imageSrc={triviaImage}
                color="#fdf0d5"
                font="Courier"
                onClick={handleClickTrivia}/>

                <Card title="Duelos"
                text="Juega y diviertete con amigos y personas online, desafialos a distinos modos de juego."
                imageSrc={duelosImage}
                color="#fdf0d5"
                font="Courier"
                onClick={handleClickDuelos}/>           
            </div> 
            <div className="container-wavy">
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
            </div>
            <Footer 
            aboutText="About us" 
            contactText="Contact" 
            servicesText="Sevices"
            copyrightText="©Copyright 2023 Florida. All Rights Reserved."
            />
        </>
    );
       

}

export default FirstPage;