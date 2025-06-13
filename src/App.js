import React, { useState } from 'react';
import './App.css';

import RegionSelector from './RegionSelector';
import StopSelector from './StopSelector';
import BusButtons from './BusButtons';
import BusSchedule from './BusSchedule';
import StopSchedule from './StopSchedule'; // 👈 добавили

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedBus, setSelectedBus] = useState('');

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedStop('');
    setSelectedBus('');
  };

  const handleStopChange = (stop) => {
    setSelectedStop(stop);
    setSelectedBus('');
  };

  const handleBusClick = (busNumber) => {
    setSelectedBus(busNumber);
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

          {/* Кнопки автобусов */}
          <BusButtons region={selectedRegion} stop={selectedStop} onBusClick={handleBusClick} />

          {/* Расписание всей остановки */}
          <StopSchedule region={selectedRegion} stop={selectedStop} />
        </>
      )}

      {selectedBus && (
        <>
          <p>Вы выбрали автобус: {selectedBus}</p>
          <BusSchedule region={selectedRegion} stop={selectedStop} busNumber={selectedBus} />
        </>
      )}
    </div>
  );
}

export default App;
