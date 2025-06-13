// src/RegionSelector.js
import React, { useState, useEffect } from 'react';

function RegionSelector({ onRegionChange }) {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    fetch('https://peatus.metaler.com.ua/regions')
      .then((res) => res.json())
      .then((data) => {
        const cleanedRegions = data.filter(region => region.title !== null);
        setRegions(cleanedRegions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки регионов:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onRegionChange(region);
  };

  if (loading) return <p>Загрузка регионов...</p>;

  return (
    <div>
      <label htmlFor="region-select">Выберите регион:</label>
      <select id="region-select" value={selectedRegion} onChange={handleChange}>
        <option value="">-- выберите регион --</option>
        {regions.map((region, index) => (
          <option key={index} value={region.title}>
            {region.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
