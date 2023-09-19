import Globe from 'react-globe.gl';
import './App.css';

function App() {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      atmosphereAltitude="0.2"
    />
  );
}

export default App;
