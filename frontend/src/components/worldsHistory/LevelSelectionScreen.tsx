import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar"
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import LevelButton from '../LevelButton';
import './LevelSelectionScreen.css';
import axios from 'axios';
import { PATH } from '../../constants';
import { AnyARecord } from 'dns';

const LevelSelectionScreen: React.FC<{}> = () => {


  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState<any>(0);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    var length = 0;
    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${PATH}/history/world/getquestions/${location.state.worldId}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    axios.request(config2)
    .then((response) => {
      setLevels(response.data.questions)
      length = response.data.questions.length
    })
    .catch((error) => {
      console.log(error);
    });


    const reqBody = JSON.stringify({
      userId: localStorage.getItem('userId'),
      galaxyId: location.state.galaxyId,
      worldId: location.state.worldId,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${PATH}/user/currentQuestion`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data : reqBody
      };

    axios.request(config)
    .then((response) => {
      if (!response.data){
        setCurrentLevel(length+1)
      }else{
        setCurrentLevel(response.data)
      }
    })
    .catch((error) => {
      console.log(error);
    });   

    

    
  }, []);
  
      return (
    <>
      <NavBar showButtons={false}/>
      <div className="level-selection-screen">
        <h1 className='level-title'>3° Escuela | Divisiones</h1>
        <hr className="horizontal-line"/>
        <div className="level-grid">
          {levels.map((level, index) => (
              (currentLevel < level.id) ? (
                <LevelButton level={level.id} index={index} onClick={() => setSelectedLevel(level.id)} current_level={currentLevel} />
              ) : (
                <Link to={`/question/${level.id}`} key={level.id}>
                    <LevelButton level={level.id} index = {index} onClick={() => setSelectedLevel(level.id)} current_level={currentLevel} />
                </Link>
              )
          ))}
        </div>
      </div>
    </>
  );
};

export default LevelSelectionScreen;