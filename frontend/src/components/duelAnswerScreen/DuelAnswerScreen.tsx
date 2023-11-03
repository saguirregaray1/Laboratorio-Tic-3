import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import './DuelAnswerScreen.css'
import LoadingPage from "../loadingPage/LoadingPage";


const DuelAnswerScreen : React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isCorrect, setIsCorrect] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])
    

    return (
        <>
            {isLoading ? <LoadingPage/> : 
            <>
                <NavBar showButtons={true}/>
                <div className="duel-answer-container">
                    <p>{isCorrect}</p>
                </div>
            </>
            }
        </>
    );
}

export default DuelAnswerScreen;