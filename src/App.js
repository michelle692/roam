import React,  { useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

import Button from './components/button.js';
import Popup from './components/popup.js';
import LocationPopup from './components/location_popup.js';

function App() {
  const [points, setPoints] = useState([])
  const mainGlobe = useRef();
  const [button1, setButton1] = useState([false, false, false]);
  const [locInput, setLocInput] = useState("")

  function clickLabel(lat, lng) {
    mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
  }

  const handleClick1 = () => {
    setButton1([!button1[0], false, false]);
  }
  const handleClick2 = () => {
    setButton1([false, !button1[1], false]);
  }

  const handleClick3 = () => {
    setButton1([false, false, !button1[2]]);
  }

  const handleClick4 = () => {
    setButton1([false, false, false]);
  }

  const handleLocSubmit = () => {
    setButton1([false, false, false]);
    console.log(locInput)
    let coords = locInput.split(",")
    let lat = Number.parseFloat(coords[0])
    let lng = Number.parseFloat(coords[1])
    setPoints([{
      lng: lng,
      lat: lat,
      size: Math.random() / 3,
      color: 'green',
      name: lat.toString() + ", " + lng.toString()
    }])
    mainGlobe.current.pointOfView({ lat: lat, lng: lng, altitude: .5 }, 1600)
  }

  const changeLocVal = (event) => {
    setLocInput(event.target.value)
  }

  return (
    <div>
    <Globe
      ref={mainGlobe}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor ="#6D5BA1"
      atmosphereColor={'white'}
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
    
    <Button val={button1[0]} onClick={handleClick1} offset={'25vh'}>ADD LOCATION</Button>
    <Button val={button1[1]} onClick={handleClick2} offset={'calc(25vh + 50px)'}>TRAVEL WISHLIST</Button>
    <Button val={button1[2]} onClick={handleClick3} offset={'calc(25vh + 100px)'}>TRAVEL HISTORY</Button>
    <LocationPopup open={button1[0]} close={handleClick4} onChange={changeLocVal} submit={handleLocSubmit}>ADD LOCATION</LocationPopup>
    <Popup open={button1[1]} close={handleClick4}>TRAVEL WISHLIST</Popup>
    <Popup open={button1[2]} close={handleClick4}>TRAVEL HISTORY</Popup>
    
    <p className="Title">ROAM</p>
    </div>
    
  );
}

export default App;
