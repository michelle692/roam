import React,  { useState } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

function App() {
  const [atmosphere, setAtmosphere] = useState(0.3);

  const increaseAtmosphere = (lat, long, event) => {
    setAtmosphere(atmosphere + 0.05);
  }

  
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

      atmosphereAltitude={atmosphere.toString()}

      onGlobeClick = {(increaseAtmosphere)}
    />
  );
}

export default App;
