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
import { PATH } from '../../constants';

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
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${PATH}/user/checkAnswer`,
      headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
      },
      data: {
          userId : localStorage.getItem('userId'),
          questionId: question.id,
          answer: answer,
          
      }
    };

    axios.request(config)
          .then((response) => {
            console.log(response.data)
            if (response.data.result.isCorrect){
              setCorrectionText(`Respuesta ${response.data.result.answer} es correcta`)
              setIsResolved(true);
            }else{
              setCorrectionText('Respuesta incorrecta')
            }
                   })
          .catch((error) => {
              console.log(error);
          });
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
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${PATH}/history/question/${level}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    axios.request(config)
    .then((response) => {
      setQuestion(response.data.question)
      console.log(response.data.question)
      setIsLoading(false); 
    })
    .catch((error) => {
      console.log(error);
    });
    
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
              {question.theorem != null && (
                <div className="view-theorem" onClick={handleTheorem}>
                <p className="text-clue">{theoremTextBtn}</p>
                <img
                  src={lupa}
                  alt="Theorem Img"
                  className="image-clue"
                />
              </div>
              )}
              {showTheorem &&  (
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
