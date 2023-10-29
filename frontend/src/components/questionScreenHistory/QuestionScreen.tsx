import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import LoadingPage from '../loadingPage/LoadingPage';
import NavBar from '../NavBar';
import './QuestionScreen.css'
import lupa from '../../assets/lupa.png'
import back_arrow from '../../assets/back_level_arrow.png'
import question_resolved from '../../assets/question_resolved.png'

const QuestionScreen: React.FC<{}> = () => {
  const { level } = useParams();
  const [answer, setAnswer] = useState<string>('');
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showTheorem, setShowTheorem] = useState<boolean>(false);
  const [theoremTextBtn, setTheoremTextBtn] = useState<string>('Mostrar Teorema')
  const [isResolved, setIsResolved] = useState<boolean>(false)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [correctionText, setCorrectionText] = useState<string>('')
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (answer === question.answer){
      setCorrectionText(`Respuesta ${answer} es correcta`)
      setIsResolved(true);
    }else{
      setCorrectionText('Respuesta incorrecta')
    }
    setIsConfirmed(true)
  };

  const handleTheorem = () => {
    if(showTheorem){
      setTheoremTextBtn("Mostrar Teorema")
    }else{
      setTheoremTextBtn("Esconder Teorema")
    }
    setShowTheorem(!showTheorem);
  };

  const handleBackLevel = () => {
    navigate('/history/world')
  };

  const handleNextQuestion = () => {
    // FALTA HACER ESTO, el siguiente codigo no recarga la pagina otra vez
    /*if (level){
      const next_level = parseInt(level, 10) + 1
      navigate(`/question/${next_level}`)
    }*/
  };

  useEffect(() => {
    /*
    axios.get(`http://localhost:8000/api/v1/trivia/id/${level}`)
        .then((response) => {
            setQuestion(response.data.question);
            setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching question:', error);
        });
    */
    
    // HARDCODE
    const response = {
      id: 18,
      body: "Si un jugador rival anteriormente vistió la camiseta de tu equipo, ¿como mínimo cuántos goles te va a clavar?",
      answer: "1",
      type: "ni idea bro",
      category: "Furbo",
      world: {
        id: 23,
        name: "Juego sagrado",
        questions: [
          "question1",
          "question2",
          "question3"
        ],
        galaxy : "Deportes"
      },
      theorem: {
        id: 8,
        name: "La inexorable Ley del EX",
        statement: "En caso de enfrentar un equipo, cuyo plantel sea integrado por un jugador que supo formar parte de tu institución en el pasado. Entonces podemos concluir de forma segura que al menos un gol va a convertir.",
        proof: "Se demuestra en la practica, se trata de un suceso al que nadie puede escapar, es INEXORABLE"
      }
    };
    setQuestion(response);
    setIsLoading(false); 
  }, []);

  return (
    <div className="question-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar showButtons={false}/>
          <div className="page-background">
            <div className="page-container">
              <h2 className="page-title">{question.world.name}  Nivel {level}</h2>
              <p className="intro-text">Resuelva el siguiente ejercicio para avanzar de nivel</p>
              <p className="question-body">{question.body}</p>
              <input
                type="text"
                placeholder="Ingrese su respuesta"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if(isConfirmed){
                    setIsConfirmed(false)
                    if(isResolved){
                      setIsResolved(false)
                    }
                  } 
                }}
                disabled={!question}
                className="input-answer"
              />
              <button className="confirm-answer" onClick={handleSubmit} disabled={!question}>Confirmar</button>
              {isConfirmed && (
                <p className="correction-text">{correctionText}</p>
              )}
              <div className="view-theorem" onClick={handleTheorem}>
                <p className="text-clue">{theoremTextBtn}</p>
                <img
                  src={lupa}
                  alt="Theorem Img"
                  className="image-clue"
                />
              </div>
              {showTheorem && (
                <div className="center-theorem">
                  <div className="theorem-container">
                    <h2 className="theorem-title">{question.theorem.name}</h2>
                    <p className="theorem-body">{question.theorem.statement}</p>
                  </div>
                </div>
              )}
            </div>
            <div className='navigate-container'>
              <div className="back-level" onClick={handleBackLevel}>
                <img src={back_arrow} alt="Back Img"/>
                <p>Volver a elegir nivel</p>
              </div>
              {isResolved && (
                <div className="resolved-button" onClick={handleNextQuestion}>
                  <p>Siguiente nivel</p>
                  <img src={question_resolved} alt="Avanza Img"/>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionScreen;
