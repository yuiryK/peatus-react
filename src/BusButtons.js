// src/BusButtons.js
import React, { useState, useEffect } from 'react';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function BusButtons({ region, stop }) {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region || !stop) {
      setBuses([]);
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

  if (loading) return <p>Загрузка автобусов...</p>;
  if (!buses.length) return <p>Нет автобусов для выбранной остановки.</p>;

  return (
    <div>
      <h2>Автобусы для {stop}:</h2>
      {buses.map((bus, index) => (
        <button key={index}>{bus.title}</button>
      ))}
    </div>
  );
}

export default BusButtons;
