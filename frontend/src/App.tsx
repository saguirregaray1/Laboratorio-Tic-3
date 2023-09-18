import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Origin from './containers/origin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Origin/>}/>
        <Route path ="/nacional" element={<h1>Nacional nacional</h1>}/>
        <Route path ="/*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;