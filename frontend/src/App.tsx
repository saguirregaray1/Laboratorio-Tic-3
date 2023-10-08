import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom'
import Origin from './containers/origin';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import GameScreen from './components/GameScreen';
import QuestionScreen from './components/QuestionScreen';
import FirstPage from './containers/FirstPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Origin/>}/>
        <Route path ="/nacional" element={<FirstPage/>}/>
        <Route path="/levels" element={<LevelSelectionScreen/>} />
        <Route path="/question/:level" element={<QuestionScreen />}/>
        <Route path ="/*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

