import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Origin from './containers/origin';
import FirstPage from './containers/FirstPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Origin/>}/>
        <Route path ="/nacional" element={<FirstPage/>}/>
        <Route path ="/*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;