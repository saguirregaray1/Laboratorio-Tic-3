import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import './TriviaPlayScreen.css'
import LoadingPage from '../loadingPage/LoadingPage';
import NavBar from '../NavBar';
import backTrivia from '../../assets/back_trivia.png'
import nextQuestion from '../../assets/next_question.png'
import {PATH} from '../../constants'
import Latex from 'react-latex';

const TriviaPlayScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [questionId, setQuestionId] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [correctChoice, setCorrectChoice] = useState<boolean>(false)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const data = JSON.stringify({
      "universe": location.state.universe,
      "galaxy": location.state.galaxy
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${PATH}/trivia/play`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      const data = response.data.question
      setQuestion(data.body);
      setOptions([data.option1, data.option2, data.option3, data.option4])
      setQuestionId(data.id)
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if(showMessage){
      setShowMessage(false);
    }

    setShowResults(true);

  };

  const handleConfirmAnswer = () => {
    let data = JSON.stringify({
      "id": questionId,
      "answer": selectedOption
    });

    let config = {
      method: 'post',
      url: `${PATH}/trivia/play/check`,
      data : data,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    axios.request(config)
    .then((response) => {
      const answer = response.data.answer;
      if (selectedOption === answer) {
        const selectedOpt = document.querySelector('.selected-option');
        if (selectedOpt) {
          selectedOpt.classList.add('correct-option');
          selectedOpt.classList.remove('selected-option');
        }
        setCorrectChoice(true)
      } else {
        const selectedOpt = document.querySelector('.selected-option');
        if (selectedOpt) {
          selectedOpt.classList.add('incorrect-option');
          selectedOpt.classList.remove('selected-option');
        }
        setCorrectChoice(false)
      }
      setShowMessage(true);
    })
    .catch((error) => {
      console.log(error);
    });


    
  };

  const handleNextQuestion = () => {
    let data = JSON.stringify({
      "universe": location.state.universe,
      "galaxy": location.state.galaxy
    });

    let config = {
      method: 'post',
      url: `${PATH}/trivia/play`,
      data : data,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    setIsLoading(true);
    axios.request(config)
    .then((response) => {
      const data = response.data.question
      setQuestion(data.body);
      setOptions([data.option1, data.option2, data.option3, data.option4])
      setQuestionId(data.id)
      setIsLoading(false);
      setShowResults(false);
      setSelectedOption(null);
      setCorrectAnswer('');
      setShowMessage(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="trivia-play-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar showButtons={false}/>
          <div className="title-container">
            <h1 className='level-title'>¿Podrás resolver el siguiente problema?</h1>
          </div>
          <div className="content-container">
            <div className="trivia-question-latex-container"><Latex>{question}</Latex></div>
            <p>Elige una opción</p>
            <ul>
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={option === selectedOption ? 'selected-option' : 'unselected-option'}
                >
                  <div className='trivia-option-latex-container'><Latex>{option}</Latex></div>
                </li>
              ))}
            </ul>
            <div className='last-line-container'>
              <div className='left-side'>
                {showMessage && (
                  <a className={correctChoice ? 'correct-message' : 'incorrect-message'}>
                    {correctChoice ? 'Respuesta correcta. ¡Felicitaciones!' : 'Respuesta incorrecta. ¡Intentalo otra vez!'}
                  </a>
                )}
              </div>
              <div className='right-side'>
                {selectedOption && (
                  <div className="button-container">
                    <button onClick={handleConfirmAnswer}>Confirmar Respuesta</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="navigate-container">
            <Link to={`/trivia`} className="no-underline">
              <div className="left-footer">
                <img src={backTrivia} alt="Image 1"/>
                <p>Volver a elegir mi mundo</p>
              </div>
            </Link>
            <div className="right-footer" onClick={handleNextQuestion}>
              <p>Siguiente Pregunta</p>
              <img src={nextQuestion} alt="Image 2" />
            </div>
          </div>
        </>
      )}
      
    </div>
  );
};

export default TriviaPlayScreen;
