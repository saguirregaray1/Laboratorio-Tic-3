import React from "react";
import "../card/styles.css"
import CustomButton from "../customButton/customButton";

interface CardProps {
    title: string;
    text: string;
    imageSrc: string | null;
    color?: string;
    font?: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({title, onClick, text, imageSrc, color = 'white', font = 'Arial'}) => {
    const cardStyle: React.CSSProperties= {
        backgroundColor: color,
        fontFamily: font,
    }

    return (
        <>
            <div className="card" style={cardStyle}>
                {imageSrc && <img src={imageSrc} alt={title} className="cardImg" />}
                <h2 className="title">{title}</h2>
                <div className="text">
                    <p>{text}</p>
                </div>
                <CustomButton
                onClick={onClick}
                label="Jugar"
                />
            </div>
        </>
    )

}


export default Card;