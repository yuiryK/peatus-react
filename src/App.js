import React, { useState, useEffect } from 'react';
import './App.css';

import RegionSelector from './RegionSelector';
import StopSelector from './StopSelector';
import BusButtons from './BusButtons';
import BusSchedule from './BusSchedule';
import StopSchedule from './StopSchedule';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);


  // ✅ При загрузке используем реальную геолокацию браузера
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const response = await fetch(`https://peatus.metaler.com.ua/geolocation/${longitude}/${latitude}`);
          if (!response.ok) throw new Error('Ошибка сети при геолокации');

          const data = await response.json();
          if (data.length > 0) {
            const nearestStop = data[0];
            setSelectedRegion(nearestStop.stop_area);
            setSelectedStop(nearestStop.title);
          }
        } catch (error) {
          console.error('Ошибка при получении геолокации:', error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Не удалось получить геолокацию:', error);
        setLoadingLocation(false);
      }
    );
  }, []);

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

  const handleReset = () => {
    setSelectedRegion('');
    setSelectedStop('');
    setSelectedBus('');
  };

  if (loadingLocation) {
    return <div>Определяем ваше местоположение...</div>;
  }

  return (
    <div className="App">
      <h1>Выбор автобусной зоны</h1>

      {/* ✅ Теперь RegionSelector получает выбранный регион */}
      <RegionSelector 
        onRegionChange={handleRegionChange} 
        selectedRegion={selectedRegion} 
      />

      {selectedRegion && (
        <>
          <p>Вы выбрали регион: {selectedRegion}</p>
          <StopSelector 
            region={selectedRegion} 
            onStopChange={handleStopChange} 
            selectedStop={selectedStop} 
          />
        </>
      )}

      {selectedStop && (
        <>
          <p>Вы выбрали остановку: {selectedStop}</p>
          <BusButtons region={selectedRegion} stop={selectedStop} onBusClick={handleBusClick} />
          <StopSchedule region={selectedRegion} stop={selectedStop} />
        </>
      )}

      {selectedBus && (
        <>
          <p>Вы выбрали автобус: {selectedBus}</p>
          <BusSchedule region={selectedRegion} stop={selectedStop} busNumber={selectedBus} />
        </>
      )}
      <button onClick={handleReset}>Сбросить выбор</button>
    </div>
  );
}

export default App;
