// src/BusButtons.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';  // ADD THIS
import BusSchedule from './BusSchedule';

function encodeForUrl(str) {
  return encodeURIComponent(str);
}

function BusButtons({ region, stop }) {
  const { t } = useTranslation(); // ADD THIS

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
        console.error(t('error_loading_buses'), error);  // USE TRANSLATION KEY
        setBuses([]);
        setLoading(false);
      });
  }, [region, stop, t]); // include t in deps

  const handleBusClick = (busNumber) => {
    console.log('Clicked bus:', busNumber);
    setSelectedBus(busNumber);
  };

  if (loading) return <p>{t('loading_buses')}</p>; // USE TRANSLATION
  if (!buses.length) return <p>{t('no_buses')}</p>; //USE TRANSLATION

  return (
    <div>
      <h2>{t('buses_for', { stop })}:</h2> {/* USE TRANSLATION */}
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
