import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function BusSchedule({ region, stop, busNumber }) {
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!region || !stop || !busNumber) {
      setSchedule([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    const url = `https://peatus.metaler.com.ua/bustime/${encodeForUrl(region)}/${encodeForUrl(stop)}/${encodeForUrl(busNumber)}`;
    console.log('Fetching schedule:', url);

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
        setError(t('error_loading_timetable'));
      });
  }, [region, stop, busNumber, t]);

  if (loading) return <p>{t('loading_timetable')}</p>;
  if (error) return <p>{error}</p>;
  if (!schedule.length) return <p>{t('no_timetable', { busNumber })}</p>;

  return (
    <div>
      <h3>{t('timetable_for', { busNumber })}:</h3>
      <ul>
        {schedule.map((time, index) => (
          <li key={index}>{time.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BusSchedule;
