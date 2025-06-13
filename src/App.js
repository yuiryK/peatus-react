import React, { useState } from 'react';
import './App.css';

// ✅ Импорт твоих готовых компонентов
import RegionSelector from './RegionSelector';
import StopSelector from './StopSelector';
import BusButtons from './BusButtons'; // он уже знает, что делать
import BusSchedule from './BusSchedule'; // этот импорт нужен, если ты хочешь отдельный компонент для расписания

function App() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedBus, setSelectedBus] = useState('');

  // обработчик смены региона
  const handleRegionChange = (region) => {
    console.log('Выбран регион:', region);
    setSelectedRegion(region);
    setSelectedStop(''); // сброс остановки
    setSelectedBus('');  // сброс автобуса
  };

  // обработчик смены остановки
  const handleStopChange = (stop) => {
    console.log('Выбрана остановка:', stop);
    setSelectedStop(stop);
    setSelectedBus(''); // сброс автобуса
  };

  // обработчик выбора автобуса при нажатии на кнопку
  const handleBusClick = (busNumber) => {
    console.log('Выбран автобус:', busNumber);
    setSelectedBus(busNumber);
  };

  return (
    <div className="App">
      <h1>Выбор автобусной зоны</h1>

      {/* Компонент выбора региона */}
      <RegionSelector onRegionChange={handleRegionChange} />

      {/* Если выбран регион — показываем выбор остановки */}
      {selectedRegion && (
        <>
          <p>Вы выбрали регион: {selectedRegion}</p>
          <StopSelector region={selectedRegion} onStopChange={handleStopChange} />
        </>
      )}

      {/* Если выбрана остановка — показываем кнопки автобусов */}
      {selectedStop && (
        <>
          <p>Вы выбрали остановку: {selectedStop}</p>
          <BusButtons region={selectedRegion} stop={selectedStop} onBusClick={handleBusClick} />
        </>
      )}

      {/* Если выбран автобус — показываем расписание */}
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
