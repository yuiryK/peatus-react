import React, { useState } from 'react';
import './App.css';
import RegionSelector from './RegionSelector';
import StopSelector from './StopSelector';
import BusButtons from './BusButtons';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStop, setSelectedStop] = useState('');

  const handleRegionChange = (region) => {
    console.log('Выбран регион:', region);
    setSelectedRegion(region);
    setSelectedStop(''); // Сброс остановки, если регион изменился
  };

  const handleStopChange = (stop) => {
    console.log('Выбрана остановка:', stop);
    setSelectedStop(stop);
  };

  return (
    <div className="App">
      <h1>Выбор автобусной зоны</h1>
      <RegionSelector onRegionChange={handleRegionChange} />
      {selectedRegion && (
        <>
          <p>Вы выбрали регион: {selectedRegion}</p>
          <StopSelector region={selectedRegion} onStopChange={handleStopChange} />
        </>
      )}
      {selectedStop && (
        <>
          <p>Вы выбрали остановку: {selectedStop}</p>
          <BusButtons region={selectedRegion} stop={selectedStop} />
        </>
      )}
    </div>
  );
}

export default App;
