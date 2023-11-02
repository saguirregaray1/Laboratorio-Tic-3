import React, {useState, useEffect} from 'react';
import './DuelPlayScreen.css';
import NavBar from '../NavBar';
import DuelPlayCard from './DuelPlayCard';
import LoadingPage from '../loadingPage/LoadingPage';
import { faPlus, faDivide, faXmark, faSubtract } from '@fortawesome/free-solid-svg-icons';


const DuelPlayScreen2: React.FC = () => {
    
    const [question, setQuestion] = useState<string>('Cual es el area de un triangulo de base 3 y altura 2 sjakldfja;sdjfl;asjdflkajsdlfkjasldkf lkjasdlkfjalsdjflaj alsdfjal sjdflaj slk');
    const [options, setOptions] = useState<string[]>(['1', '2', '3', '4']);
    const [isLoading, setIsLoading] = useState(true);
    const colors = ['#379683', 'brown', '#190061', '#950740'];
    const icons = [faPlus, faDivide, faXmark, faSubtract]

    const handleCardClick = (option:string) => {
        console.log(option);
    }

    useEffect(()=>{
        setIsLoading(false);
    },[])



    return(
        <>
            {
                isLoading ? <LoadingPage/> : (
                    <>
                    <NavBar showButtons={true}></NavBar>
                    <div className='duel-play-container'>
                        <div className='question-container'>
                            <p>{question}</p>
                        </div>
                        <div className='options-container'>
                        {options.map((option, index) => (
                            <DuelPlayCard option={option} color={colors[index]} icon={icons[index]} onClick={() => handleCardClick(option)}/>
                        ))}
                        </div>
                    </div>
                    </>
                )
                
            }
            
        </>
    )
    
};

export default DuelPlayScreen2;