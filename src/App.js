import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import './i18n';

import RegionSelector from './RegionSelector';
import StopSelector from './StopSelector';
import BusButtons from './BusButtons';
import BusSchedule from './BusSchedule';
import StopSchedule from './StopSchedule';
import LanguageSwitcher from './LanguageSwitcher';

import { ThemeContext, ThemeProvider } from './ThemeContext'; // ✅ импорт контекста

function AppContent() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext); // ✅ контекст

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStop, setSelectedStop] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const response = await fetch(`https://peatus.metaler.com.ua/geolocation/${longitude}/${latitude}`);
          if (!response.ok) throw new Error(t('network_error_geolocation'));

          const data = await response.json();
          if (data.length > 0) {
            const nearestStop = data[0];
            setSelectedRegion(nearestStop.stop_area);
            setSelectedStop(nearestStop.title);
          }
        } catch (error) {
          console.error(t('error_getting_geolocation'), error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error(t('error_getting_geolocation'), error);
        setLoadingLocation(false);
      }
    );
  }, [t]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedStop('');
    setSelectedBus('');
  };

  const handleStopChange = (stop) => {
    setSelectedStop(stop);
    setSelectedBus('');
  };

  const handleBusClick = (busNumber) => {
    setSelectedBus(busNumber);
  };

  const handleReset = () => {
    setSelectedRegion('');
    setSelectedStop('');
    setSelectedBus('');
  };

  if (loadingLocation) {
    return <div>{t('determining_location')}</div>;
  }

  return (
    <div className={`App ${theme}`}>
      <LanguageSwitcher />

      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Theme' : '☀️ Light Theme'}
      </button>

      <h1>{t('zone_selection')}</h1>

      <RegionSelector 
        onRegionChange={handleRegionChange} 
        selectedRegion={selectedRegion} 
      />

      {selectedRegion && (
        <>
          <p>{t('your_region')} {selectedRegion}</p>
          <StopSelector 
            region={selectedRegion} 
            onStopChange={handleStopChange} 
            selectedStop={selectedStop} 
          />
        </>
      )}

      {selectedStop && (
        <>
          <p>{t('your_stop')} {selectedStop}</p>
          <BusButtons region={selectedRegion} stop={selectedStop} onBusClick={handleBusClick} />
          <StopSchedule region={selectedRegion} stop={selectedStop} />
        </>
      )}

      {selectedBus && (
        <>
          <p>{t('your_bus')} {selectedBus}</p>
          <BusSchedule region={selectedRegion} stop={selectedStop} busNumber={selectedBus} />
        </>
      )}
      <button onClick={handleReset}>{t('reset_selection')}</button>
    </div>
  );
}

// ✅ Оборачиваем в ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
