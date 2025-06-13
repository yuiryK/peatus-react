import React, { useState } from 'react';
import './App.css';
import RegionSelector from './RegionSelector';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionChange = (region) => {
    console.log('Выбран регион:', region);
    setSelectedRegion(region);
  };

  return (
    <div className="App">
      <h1>Выбор автобусной зоны</h1>
      <RegionSelector onRegionChange={handleRegionChange} />
      {selectedRegion && <p>Вы выбрали: {selectedRegion}</p>}
    </div>
  );
}

export default App;
