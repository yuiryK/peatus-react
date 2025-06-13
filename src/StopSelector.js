// src/StopSelector.js
import React, { useState, useEffect } from 'react';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function StopSelector({ region, onStopChange }) {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStop, setSelectedStop] = useState('');

  useEffect(() => {
    if (!region) {
      setStops([]);
      setSelectedStop('');
      return;
    }

    setLoading(true);
    const url = `https://peatus.metaler.com.ua/stops/${encodeForUrl(region)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStops(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки остановок:', error);
        setStops([]);
        setLoading(false);
      });
  }, [region]);

  const handleChange = (e) => {
    const stop = e.target.value;
    setSelectedStop(stop);
    onStopChange(stop);
  };

  if (loading) return <p>Загрузка остановок...</p>;

  return (
    <div>
      <label htmlFor="stop-select">Выберите остановку:</label>
      <select id="stop-select" value={selectedStop} onChange={handleChange} disabled={!region}>
        <option value="">-- выберите остановку --</option>
        {stops.map((stop, index) => (
          <option key={index} value={stop.title}>
            {stop.title}
          </option>
        ))}
      </select>
    </div>
  );
}


export default StopSelector;
