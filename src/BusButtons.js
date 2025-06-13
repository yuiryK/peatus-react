// src/BusButtons.js
import React, { useState, useEffect } from 'react';
import BusSchedule from './BusSchedule';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function BusButtons({ region, stop }) {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState('');

  useEffect(() => {
    if (!region || !stop) {
      setBuses([]);
      setSelectedBus('');
      return;
    }

    setLoading(true);
    const url = `https://peatus.metaler.com.ua/buses/${encodeForUrl(region)}/${encodeForUrl(stop)}`;
    console.log('Fetching:', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBuses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки автобусов:', error);
        setBuses([]);
        setLoading(false);
      });
  }, [region, stop]);

  const handleBusClick = (busNumber) => {
    console.log('Clicked bus:', busNumber);
    setSelectedBus(busNumber);
  };

  if (loading) return <p>Загрузка автобусов...</p>;
  if (!buses.length) return <p>Нет автобусов для выбранной остановки.</p>;

  return (
    <div>
      <h2>Автобусы для {stop}:</h2>
      {buses.map((bus, index) => (
        <button key={index} onClick={() => handleBusClick(bus.title)}>
          {bus.title}
        </button>
      ))}

      {selectedBus && (
        <BusSchedule region={region} stop={stop} busNumber={selectedBus} />
      )}
    </div>
  );
}

export default BusButtons;
