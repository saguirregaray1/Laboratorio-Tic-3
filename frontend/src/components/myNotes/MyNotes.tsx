import React, { useEffect, useState } from 'react';
import './MyNotes.css'
import LoadingPage from '../loadingPage/LoadingPage';
import NavBar from '../NavBar';
import nextTheorem from '../../assets/next_theorem.png'
import backTheorem from '../../assets/back_theorem.png'


const MyNotes: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [theorem, setTheorem] = useState<any>(null);

    useEffect(() => {
        //HARDCODE
        const response = {
            id : 7,
            name : "Teorema de Pitagoras",
            statement: "El teorema de pitagoras, si no mal recuerdo es solo para triangulos rectángulos, es decir hay un ánuglo de 90 grados. Se enuncia que, la hipotenusa al cuadrado es igual a la suma de los catetos al cuadrado.",
            proof: "Mira flaco no tengo ni idea, creo que al tipo este, Pitagoras, se le cayo una manzana en la cabeza o algo asi. De última preguntale al chat gpt. Abrazoo :)"
        }
        setTheorem(response);
        setIsLoading(false);
    }, []);

    return (
        <div className='my-notes-page'>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                    <NavBar showButtons={false}/>
                    <div className='theorem-container-background'>
                        <div className='theorem-title-container'>
                            <h2 className='theorem-title-notes'>{theorem.name}</h2>
                        </div>
                        <div className='theorem-container-cotent'>
                            <p className='theorem-txt-body'>{theorem.statement}</p>
                            <p className='demo-txt-title'>Demostración:</p>
                            <p className='theorem-txt-body'>{theorem.proof}</p>
                        </div>
                        <div className='theorem-page-footer'>
                            <div className='back-theorem-page'>
                                <img src={backTheorem} alt='Pagina Img' className='back-theorem-img'/>
                                <p className='back-theorem-txt'>Anterior página</p>
                            </div>
                            <div className='next-theorem-page'>
                                <p className='next-theorem-txt'>Siguiente página</p>
                                <img src={nextTheorem} alt='Pagina Img' className='next-theorem-img'/>
                            </div>
                        </div>
                    </div> 
                </>
            )}
        </div>
    );
}

export default MyNotes;