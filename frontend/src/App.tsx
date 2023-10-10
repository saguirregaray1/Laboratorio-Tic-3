import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom'
import Origin from './containers/origin';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import QuestionScreen from './components/QuestionScreen';
import TriviaScreen from './components/TriviaScreen';
import TriviaPlayScreen from './components/TriviaPlayScreen';
import FirstPage from './containers/FirstPage';
import HistoryWorldSelect from './components/HistoryWorldSelect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Origin/>}/>
        <Route path ="/nacional" element={<FirstPage/>}/>
        <Route path="/levels" element={<LevelSelectionScreen/>} />
        <Route path="/question/:level" element={<QuestionScreen />}/>
        <Route path = "/trivia" element={<TriviaScreen/>}/>
        <Route path = "/trivia/play" element={<TriviaPlayScreen/>}/>
        <Route path = "/history" element={<HistoryWorldSelect/>}/>
        <Route path = "/history/galaxies>"/>
        <Route path = "/*" element={<Navigate to="/" />}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

