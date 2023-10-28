import React, { useState} from 'react';
import './EditProfile.css'
import NavBar from '../NavBar';
import profile_image from '../../assets/default_profile.jpg'
import edit_button from '../../assets/edit_button.png'

const EditProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const options = ['1 Primaria', '2 Primaria', '3 Primaria', '4 Primaria', '5 Primaria', '6 Primaria', '1 Secundaria', '2 Secundaria', '3 Secundaria', '4 Secundaria', '5 Secundaria', '6 Secundaria', 'GAL1 Universidad', 'GAL2 Universidad', 'AM1 Universidad', 'AM2 Universidad','AM3 Universidad', 'PyE Universidad'];

    const handleEditLevel = () => {
        setIsEditing(true);
    };

    const handleUndoChanges = () => {
        setIsEditing(false);
        setSelectedOption('');
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        // if (selectedOption != '' && selectedOption != 'año educativo actual') -> hacer peticion de cambio de año educativo con valor de la variable selectedOption
        setSelectedOption('');
    };

    return (
        <>
            <NavBar showButtons={false}/>
            <div className="background-container"></div>
            <div className="profile-container">
                <div className="profile-image-container">
                    <img src={profile_image} alt="User Profile" />
                </div>
                <div className="edit-profile-form">
                    <h2 className='h2-form'>Información del perfil</h2>
                    <div className="row">
                        <div className="label">Correo Electronico:</div>
                        <div className="value">scampanella@correo.um.edu.uy</div>
                    </div>
                    <div className="row">
                        <div className="label">Nombre de usuario:</div>
                        <div className="value">santicampa8</div>
                    </div>
                    <div className="row">
                        <div className="label">Año educativo:</div>
                        <div className="value">4 Secundaria</div>
                    </div>
                    <div className="edit-container" onClick={handleEditLevel}>
                        <img src={edit_button} alt="Clickable Image" />
                    </div>
                    {isEditing && (
                        <div className="edit-dropdown">
                            <h2 className="edit-level-title">Modifica tu año educativo</h2>
                            <select className='drop-box' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="">Elige una opción</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <div className="button-container">
                                <div className="notchange-button" onClick={handleUndoChanges}>Deshacer cambios</div>
                                <div className="change-button" onClick={handleSaveChanges}>Guardar cambios</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditProfile;