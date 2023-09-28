import React,  { useState } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

import Button from './components/button.js';
import Pop from './components/popup.js';

function App() {
  const [atmosphere, setAtmosphere] = useState(0.3);

  const increaseAtmosphere = (lat, long, event) => {
    setAtmosphere(atmosphere + 0.05);
  }

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

      atmosphereAltitude={atmosphere.toString()}

      onGlobeClick = {(increaseAtmosphere)}

      backgroundColor ="#6D5BA1"
    />
    
    <Pop trigger={<Button onClick={handleClick}>ADD LOCATION</Button>}>Add Location</Pop>
    </div>
  );
}

export default App;
