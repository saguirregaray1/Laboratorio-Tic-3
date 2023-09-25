import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom'
import Origin from './containers/origin';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import GameScreen from './components/GameScreen';
import QuestionScreen from './components/QuestionScreen';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Origin/>}/>
        <Route path ="/nacional" element={<h1>Nacional nacional</h1>}/>
        <Route path="/levels" element={<LevelSelectionScreen/>} />
        <Route path="/question/:level" element={<QuestionScreen />}/>
        <Route path ="/*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

