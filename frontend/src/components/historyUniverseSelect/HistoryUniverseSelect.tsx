import React from 'react';
import './HistoryUniverseSelect.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const HistoryUniverseSelect: React.FC = () => {
    const universes = ['Primaria', 'Secundaria', 'Universidad'];
    const navigate = useNavigate();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJoZXJuYW4iLCJpYXQiOjE2OTc0MTQyMDh9.1lbm1k42SVbcDirs0PE-BHqRtyJSfl1vetBlEvdugr8';
    const userId = '';
    const handleUniverseSelect = (universe:string) => {
        navigate('/history/universe', {state:{universe: universe, token: token, userId: userId}})
    }
    return (
        <div className='universe-container'>
        {universes.map((universe) => (
            <div className="card" onClick={() => handleUniverseSelect(universe)}>
                <h2>{universe}</h2>
            </div>
        ))};
        </div>
    );
};

export default HistoryUniverseSelect;
