import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar"
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import LevelButton from '../LevelButton';
import './LevelSelectionScreen.css';
import axios from 'axios';
import { PATH } from '../../constants';
import { AnyARecord } from 'dns';
import LoadingPage from '../loadingPage/LoadingPage';

const LevelSelectionScreen: React.FC<{}> = () => {


  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState<any>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [galaxyName,setGalaxy] = useState<string>('')
  const [worldName,setWorld] = useState<string>('')
  const [isLoading,setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    var lengthStr='';
    var length=0;
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
      localStorage.setItem('length',response.data.questions.length)
      
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
    .then((response1) => {
      if (!response1.data){
        lengthStr = localStorage.getItem('length')!
      if (lengthStr){
        length = parseInt(lengthStr)
      }
        console.log('length',length)
        console.log(localStorage.getItem('length'))

        setCurrentLevel(length+1)
      }else{
        setCurrentLevel(response1.data)
      }
    })
    .catch((error) => {
      console.log(error);
    });   

    let config3 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${PATH}/history/galaxy/${location.state.galaxyId}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    axios.request(config3)
    .then((response) => {
      console.log('galaxy', response.data.galaxy)
      localStorage.setItem('galaxyId', response.data.galaxy.id)
      setGalaxy(response.data.galaxy.name)
    })
    .catch((error) => {
      console.log(error);
    });

    let config4 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${PATH}/history/world/${location.state.worldId}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };

    axios.request(config4)
    .then((response) => {
      console.log('world', response.data.world)
      setWorld(response.data.world.name)
    })
    .catch((error) => {
      console.log(error);
    });

    
    setIsLoading(false);
    

    
  }, []);
  
      return (
        <div className="level-loading-screen">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <NavBar showButtons={false}/>
          <div className="level-selection-screen">
            <h1 className='level-title'>{galaxyName} | {worldName}</h1>
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
        </>)}
    </div>
  );
};

export default LevelSelectionScreen;