import React,  { useState } from 'react';
import Globe from 'react-globe.gl';
import './App.css';

import Button from './components/button.js';
import Popup from './components/popup.js';

function App() {
  const [atmosphere, setAtmosphere] = useState(0.4);
  const [button1, setButton1] = useState([false, false, false]);

  const increaseAtmosphere = (lat, long, event) => {
    setAtmosphere(atmosphere + 0.05);
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

  return (
    <div>
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

      atmosphereAltitude={atmosphere}

      atmosphereColor={'white'}

      onGlobeClick = {(increaseAtmosphere)}

      backgroundColor ="#6D5BA1"
    />
    
    <Button val={button1[0]} onClick={handleClick1} offset={'25vh'}>ADD LOCATION</Button>
    <Button val={button1[1]} onClick={handleClick2} offset={'calc(25vh + 50px)'}>TRAVEL WISHLIST</Button>
    <Button val={button1[2]} onClick={handleClick3} offset={'calc(25vh + 100px)'}>TRAVEL HISTORY</Button>
    <Popup open={button1[0]} close={handleClick4}>ADD LOCATION</Popup>
    <Popup open={button1[1]} close={handleClick4}>TRAVEL WISHLIST</Popup>
    <Popup open={button1[2]} close={handleClick4}>TRAVEL HISTORY</Popup>
    
    <p className="Title">ROAM</p>
    </div>
  );
}

export default App;
