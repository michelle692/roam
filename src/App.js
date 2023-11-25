import React from 'react';
import './css/App.css';
import './css/index.css';

import Home from './pages/Home';
import Information from './pages/Information'
import CreateAccountPage from "./pages/CreateAccount";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className='background'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/information" element={<Information />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
