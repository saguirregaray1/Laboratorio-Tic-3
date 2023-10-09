import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import './TriviaPlayScreen.css'

const TriviaPlayScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [questionId, setQuestionId] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    let data = JSON.stringify({
      "universe": location.state.universe,
      "galaxy": location.state.galaxy
    });

    let config = {
      method: 'get',
      url: 'http://localhost:8000/api/v1/trivia/play',
      data : data,
      headers: {
        'Content-Type': 'application/json',
      }
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
    let data = JSON.stringify({
      "id": questionId,
      "answer": option
    });

    let config = {
      method: 'post',
      url: 'http://localhost:8000/api/v1/trivia/play',
      data : data,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    axios.request(config)
    .then((response) => {
      console.log(response.data)
      setCorrectAnswer(response.data.answer);
    })
    .catch((error) => {
      console.log(error);
    });
    setShowResults(true);

  };


  const handleInicioClick = () => {
    navigate('/');
  };

  const handleChangeClick = () => {
    navigate('/trivia');
  };

  const handleSiguienteClick = () => {
    let data = JSON.stringify({
      "universe": location.state.universe,
      "world": location.state.galaxy
    });

    let config = {
      method: 'get',
      url: 'http://localhost:8000/api/v1/trivia/play',
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
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="trivia-play-screen">
      {isLoading ? <p>Loading...</p> : <>
      <h1>Welcome to the Trivia Game</h1>
      <p>{question}</p>
      
      {options.map((option, index) => (
        <div
          key={index}
          className={`option ${selectedOption === option ? 'selected' : ''} ${option === correctAnswer ? 'correct': ''}`}
          onClick={() => handleOptionSelect(option)}
        >
          {option}
        </div>
      ))}


      {showResults && (
        <div>
          <p>Correct Answer: {correctAnswer}</p>
          <button onClick={handleInicioClick}>Inicio</button>
          <button onClick={handleChangeClick}>Change</button>
          <button onClick={handleSiguienteClick}>Siguiente</button>
        </div>
      )}

      </>}
      
    </div>
  );
};

export default TriviaPlayScreen;
