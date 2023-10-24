import React from 'react';
import './App.css';

import Home from './Home';
import Information from './Information'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className='background'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/information" element={<Information />} />
        </Routes>
        
      </div>
    </Router>  
  );
}

export default App;
