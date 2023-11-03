import React, {useState, useEffect} from "react";
import LoadingPage from "../loadingPage/LoadingPage";
import NavBar from "../NavBar";
import './DuelLeaderboard.css'
import axios from "axios";
import { PATH } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import WebSocketService from "../WebSocketService";

const DuelLeaderboard: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [scoresDictionary, setScoresDictionary] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const shownPlayers = 7;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            socket.on('next', (data: any) => {
                navigate(`/duel/play/${location.state.duelId}`, {state:{duelId: location.state.duelId, question: location.state.question}})
            });

            socket.on('next', (data: any) => {
                navigate(`/duel/play/${location.state.duelId}`, {state:{duelId: location.state.duelId, question: location.state.question}})
            });
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${PATH}/duel/${location.state.duelId}`,
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          };
      
          axios.request(config)
          .then((response) => {
            setScoresDictionary(response.data.duel.playerScores)
          })
          .catch((error) => {
            console.log(error);
          });
        
    }, [])

    useEffect(() => {
        if(scoresDictionary !== null){
            let scoresArray:any[] = []
            for(var key in scoresDictionary){
                scoresArray.push([key, scoresDictionary[key]]);
            }
            setLeaderboard(scoresArray.sort((a, b) => b[1] - a[1]).slice(0,shownPlayers));
        }
    }, [scoresDictionary])

    useEffect(() => {
        if(leaderboard !== null){
            setIsLoading(false);
        }
    }, [leaderboard])

    const handleNext = () => {
        const socket = WebSocketService.getInstance().getSocket();
        if (socket){
            socket.emit('goNext', location.state.duelId)
        }
        navigate(`/duel/play/${location.state.duelId}`, {state:{duelId: location.state.duelId, question: location.state.question}})
    }

    const handleFinish = () => {
        navigate(`/duel`)
    }

    return (
        <>
            {isLoading ? <LoadingPage/> : 
            <>
                <NavBar showButtons={true}/>
                <div className="duel-leaderboard-container">
                    <p className="leaderboard-p">Top 7 Puntajes</p>
                    <div className="players-scores-container">
                        {leaderboard.map((element:any, index:number) => (
                            <div className={`players-scores`} key={index + 1}>
                                <div className={`player-position ${index === 0 ? 'golden' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}> {index + 1}</div>
                                <div className={`player-info ${index === 0 ? 'golden' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                                    <div className="player-name">{element[0]}</div>
                                    <div className="player-score">{element[1]} PTS</div>
                                </div>                                
                            </div>
                        ))}    
                    </div>   
                    {location.state.winner ? 
                        <div className="duel-finish-button" onClick={handleFinish}>Inicio</div> :
                        <div className="duel-next-button" onClick={handleNext}>Siguiente</div> 

}                </div>   
            </>}
        </>
    )
}

export default DuelLeaderboard;