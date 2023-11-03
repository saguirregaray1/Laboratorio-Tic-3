import React, {useState, useEffect} from "react";
import LoadingPage from "../loadingPage/LoadingPage";
import NavBar from "../NavBar";
import './DuelLeaderboard.css'

const DuelLeaderboard: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [scoresDictionary, setScoresDictionary] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const shownPlayers = 7;

    useEffect(() => {
        setScoresDictionary({'hernan puschiasis': 30, 'santiago aguirregaray': 20, 'campa': 100, 'guzmi': 10, 'a': 10,
        'b': 1,'c': 2,'d': 3,'e': 4,'f': 5,'g': 6,'i': 7,'j': 8,'k': 9,});
        
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
                    <div className="duel-next-button">Siguiente</div>
                </div>   
            </>}
        </>
    )
}

export default DuelLeaderboard;