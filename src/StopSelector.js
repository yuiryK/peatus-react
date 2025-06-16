// src/StopSelector.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function StopSelector({ region, selectedStop, onStopChange }) {
  const { t } = useTranslation();
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) {
      setStops([]);
      return;
    }
    setLoading(true);
    fetch(`https://peatus.metaler.com.ua/stops/${encodeForUrl(region)}`)
      .then(res => res.json())
      .then(data => {
        const titles = data.map(item => item.title);
        setStops(titles);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setStops([]);
        setLoading(false);
      });
  }, [region]);

  if (loading) return <p>{t('loading_stops')}</p>;

  return (
    <div>
      <label htmlFor="stop-select">{t('select_stop')}: </label>
      <select
        id="stop-select"
        value={selectedStop}
        onChange={e => onStopChange(e.target.value)}
        disabled={!region}
      >
        <option value="">{t('placeholder_select_stop')}</option>
        {stops.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

export default StopSelector;
