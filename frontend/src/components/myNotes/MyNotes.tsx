import React, { useEffect, useState } from 'react';
import './MyNotes.css'
import LoadingPage from '../loadingPage/LoadingPage';
import NavBar from '../NavBar';
import nextTheorem from '../../assets/next_theorem.png'
import backTheorem from '../../assets/back_theorem.png'
import { PATH } from '../../constants';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';


const MyNotes: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [theorem, setTheorem] = useState<any>({name: '', statement: '', proof: ''});
    const [book, setBook] = useState<any>(null);
    const [count, setCount] = useState<number>(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${PATH}/user/${localStorage.getItem('userId')}`,
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          };
      
          axios.request(config)
          .then((response) => {
            if (response.data.book.length > 0){
                setBook(response.data.book);
                setTheorem(response.data.book[count]);
            }
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error);
          });
          
        
    }, []);

    const handleNext = () => {
        if(count < book.length - 1){
            setCount(count + 1);
            setTheorem(book[count + 1]);

        }
        
    }

    const handleBack = () => {
        if(count> 0){
            setCount(count -1);
            setTheorem(book[count - 1]);
        }
        
    }



    return (
        <div className='my-notes-page'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                    <NavBar showButtons={false}/>
                    <div className='theorem-container-background'>
                        <>
                            {book === null ? <div className='theorem-container-background-empty'>
                                    <div className='theorem-container-cotent'>
                                        <p className='theorem-txt-body' style={{textAlign:'center'}}>Juega al modo historia para acumular teoremas</p>
                                    </div>
                                </div> : <>
                            <div className='theorem-title-container'>
                                <h2 className='theorem-title-notes'>{theorem.name}</h2>
                            </div>
                            <div className='theorem-container-cotent'>
                                <p className='theorem-txt-body'>{theorem.statement}</p>
                                <p className='demo-txt-title'>Demostración:</p>
                                <p className='theorem-txt-body'>{theorem.proof}</p>
                            </div>
                            <div className='theorem-page-footer'>
                                {count > 0 ?
                                <div className='back-theorem-page' onClick={handleBack}>
                                    <img src={backTheorem} alt='Pagina Img' className='back-theorem-img'/>
                                    <p className='back-theorem-txt'>Anterior página</p>
                                </div>
                                : <></>}
                               {count<book.length -1 ? <div className='next-theorem-page' onClick={handleNext}>
                                    <p className='next-theorem-txt'>Siguiente página</p>
                                    <img src={nextTheorem} alt='Pagina Img' className='next-theorem-img'/>
                                </div>
                                 : <></>}
                            </div>
                            </>
                                
                            }
                        </>
                        
                    </div> 
                </>
            )}
        </div>
    );
}

export default MyNotes;