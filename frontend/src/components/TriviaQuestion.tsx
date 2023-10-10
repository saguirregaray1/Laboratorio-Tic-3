import React, { useState } from 'react';
import './TriviaQuestion.css'


interface TriviaQuestionProps {
    question: string;
}

const TriviaQuestion: React.FC<TriviaQuestionProps> = ({ question }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    console.log(`Submitted answer: ${answer}`);
  };

  return (
    <div className="trivia-question">
      <div className="content">
        <h2>{question}</h2>
        <input
          type="number"
          placeholder="Enter your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TriviaQuestion;
