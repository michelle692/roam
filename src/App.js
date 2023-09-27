import React,  { useState } from 'react';
import Globe from 'react-globe.gl';
import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [points, setPoints] = useState([])
  const mainGlobe = useRef();

  function clickLabel(lat, lng) {
    mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 })
  }

  return (
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
  );
}

export default App;
