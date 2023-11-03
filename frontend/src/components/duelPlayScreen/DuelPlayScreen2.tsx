import React, {useState, useEffect} from 'react';
import './DuelPlayScreen.css';
import NavBar from '../NavBar';
import DuelPlayCard from './DuelPlayCard';
import LoadingPage from '../loadingPage/LoadingPage';
import { faPlus, faDivide, faXmark, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import WebSocketService from '../WebSocketService';
import DuelAnswer from './DuelAnswer';


const DuelPlayScreen2: React.FC = () => {

    const [question, setQuestion] = useState<any>({});
    const [options, setOptions] = useState<string[]>(['1', '2', '3', '4']);
    const [isLoading, setIsLoading] = useState(true);
    const colors = ['#379683', '#451952', '#190061', '#ae8507'];
    const icons = [faPlus, faDivide, faXmark, faSubtract]; 
    const location = useLocation();
    const navigate = useNavigate();
    
    const [hasAnswered,setHasAnswered] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);


    const handleCardClick = (option:string) => {
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            socket.emit('answer', {duelId: location.state.duelId, answer: option})
            //setHasAnswered(true);
        }
    }

    useEffect(()=>{
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            
            socket.on('answered', (data: any) => {
                if (data && data.userId == localStorage.getItem('userId')){
                    setHasAnswered(true); 
                    setIsCorrect(data.isCorrect);
                     
                 }
                console.log(data);
            });
    
            socket.on('nextQuestion', async (data: any) => {
                console.log('nextQuestion',data)
                await new Promise(r => setTimeout(r, 2000)); //Sleep de 2 segundos
                navigate(`/duel/leaderboard/${location.state.duelId}`, {state:{duelId: location.state.duelId, question: data}})
            })
        }

        setQuestion(location.state.question);

        setOptions([location.state.question.option1, location.state.question.option2, location.state.question.option3, location.state.question.option4])


        setIsLoading(false)
    },[])



    return(
        <>
            {
                isLoading ? <LoadingPage/> : (
                    <>
                    <NavBar showButtons={true}></NavBar>
                    <div className='duel-play-container'>
                        <div className='question-container'>
                            <p>{question.body}</p>
                        </div>
                        <div className='options-container'>
                          {options.map((option, index) => (
                            <DuelPlayCard option={option} color={colors[index]} icon={icons[index]} onClick={() => handleCardClick(option)}/>
                        ))} 
                        </div>
                        <div className='answer-container'>
                            {hasAnswered && isCorrect ? <p>Correcto</p> : hasAnswered && !isCorrect ? <p>Incorrecto</p> : <p></p>}
                            </div> 
                    </div>
                    <div className='check-answer-container'>
                            {hasAnswered ? <DuelAnswer isCorrect = {isCorrect}/> : <></>}        
                    </div>   
                    
                    </>
                )
                
            }
            
        </>
    )
    
};

export default DuelPlayScreen2;