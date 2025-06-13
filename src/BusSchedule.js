// src/BusSchedule.js
import React, { useState, useEffect } from 'react';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function BusSchedule({ region, stop, busNumber }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region || !stop || !busNumber) {
      setSchedule([]);
      return;
    }

    setLoading(true);
    const url = `https://peatus.metaler.com.ua/bustime/${encodeForUrl(region)}/${encodeForUrl(stop)}/${encodeForUrl(busNumber)}`;
    console.log('Fetching schedule:', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки расписания:', error);
        setSchedule([]);
        setLoading(false);
      });
  }, [region, stop, busNumber]);

  if (loading) return <p>Загрузка расписания...</p>;
  if (!schedule.length) return <p>Нет расписания для автобуса {busNumber}.</p>;

  return (
    <div>
      <h3>Расписание для автобуса {busNumber}:</h3>
      <ul>
        {schedule.map((time, index) => (
          <li key={index}>{time.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BusSchedule;
