import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuestionScreen: React.FC<{}> = () => {
  const { level } = useParams();
  const [answer, setAnswer] = useState<string>('');
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSubmit = () => {
    console.log(`Level ${level} - Submitted answer: ${question.answer}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/trivia_question/${level}`)
        .then((response) => {
            setQuestion(response.data.question);
            setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching question:', error);
        });
    
  }, []);

  return (
    <div className="question-screen">
      {isLoading ? (
        <p>Loading...</p> //Cambiar esto por una pagina de loading
      ) : (
        <>
          <h1>{question.body} {level}</h1>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!question}
          />
          <button onClick={handleSubmit} disabled={!question}>Submit</button>
        </>
      )}
    </div>
  );
};

export default QuestionScreen;
