import React from "react";
import "../card/styles.css"

interface CardProps {
    title: string;
    text: string;
    imageSrc: string;
    color?: string;
    font?: string;
}

const Card: React.FC<CardProps> = ({title, text, imageSrc, color = 'white', font = 'Arial'}) => {
    const cardStyle: React.CSSProperties= {
        backgroundColor: color,
        fontFamily: font,
    }

    return (
        <>
            <div className="card" style={cardStyle}>
                <img src={imageSrc} alt={title} className="cardImg" />
                <h2 className="title">{title}</h2>
                <div className="text">
                    <p>{text}</p>
                </div>
                <button className="card-button">Jugar</button>
            </div>
        </>
    )

}


export default Card;