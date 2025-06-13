// src/StopSchedule.js
import React, { useState, useEffect } from 'react';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function StopSchedule({ region, stop }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region || !stop) {
      setSchedule([]);
      return;
    }

    setLoading(true);
    const url = `https://peatus.metaler.com.ua/stoptime/${encodeForUrl(region)}/${encodeForUrl(stop)}`;
    console.log('Fetching stop schedule:', url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки расписания остановки:', error);
        setSchedule([]);
        setLoading(false);
      });
  }, [region, stop]);

  if (loading) return <p>Загрузка...</p>;
  if (!schedule.length) return <p>Нет расписания для остановки {stop}.</p>;

  return (
    <div>
      <h3>Расписание для {stop}:</h3>
      <ul>
        {schedule.map((item, index) => (
          <li key={index}>
            {item.title} {item.route_long_name} {item.adjusted_date} {item.adjusted_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StopSchedule;
