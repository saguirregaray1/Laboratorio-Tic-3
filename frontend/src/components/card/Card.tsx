import React from "react";
import "./styles.css"
import CustomButton from "../customButton/customButton";

interface CardProps {
    title: string;
    text: string;
    imageSrc: string | null;
    color?: string;
    font?: string;
    isDisabledBtn: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({title, onClick, text, imageSrc, color = 'white', font = 'Arial', isDisabledBtn}) => {
    const cardStyle: React.CSSProperties= {
        backgroundColor: color,
    }

    return (
        <>
            <div className="card-container-style" style={cardStyle}>
                {imageSrc && <img src={imageSrc} alt={title} className="cardImg" />}
                <h2 className="crad-title-style">{title}</h2>
                <div className="card-body-text-container ">
                    <p className="card-body-text-style">{text}</p>
                </div>
                <CustomButton
                color="#ff7f51"
                onClick={onClick}
                label="JUGAR"
                isDisabled={isDisabledBtn}
                />
            </div>
        </>
    )

}


export default Card;