import React,  { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

import Button from './components/button.js';
import Pop from './components/popup.js';

function App() {
  const [points, setPoints] = useState([])
  const mainGlobe = useRef();

  function clickLabel(lat, lng) {
    mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
  }

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
    <Globe
      ref={mainGlobe}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      atmosphereAltitude="0.2"
      labelsData={points}
      labelLat={d => d.lat}
      labelLng={d => d.lng}
      labelText={d => d.name}
      labelSize={1.5}
      labelColor={() => 'yellow'}
      labelIncludeDot={true}
      labelDotRadius={1.25}
      onLabelClick={(label, event, { lat, lng, altitude }) => clickLabel(lat, lng)}
      onGlobeClick={({ lat, lng}, event) => setPoints([{
        lng: lng,
        lat: lat,
        size: Math.random() / 3,
        color: 'green',
        name: "Atlanta"
      }])}
    />
    
    <Pop trigger={<Button onClick={handleClick}>ADD LOCATION</Button>}>Add Location</Pop>
    </div>
    
  );
}

export default App;
