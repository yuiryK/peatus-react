// src/StopSchedule.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function StopSchedule({ region, stop }) {
  const { t } = useTranslation();
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
        console.error(t('error_loading_timetable'), error);
        setSchedule([]);
        setLoading(false);
      });
  }, [region, stop, t]);

  if (loading) return <p>{t('loading_timetable')}</p>;
  if (!schedule.length) return <p>{t('no_timetable')} {stop}.</p>;

  return (
    <div>
      <h3>{t('timetable_for')} {stop}:</h3>
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
