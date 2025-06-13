// src/RegionSelector.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function RegionSelector({ selectedRegion, onRegionChange }) {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://peatus.metaler.com.ua/regions')
      .then(res => res.json())
      .then(data => {
        const titles = data
          .map(item => item.title)
          .filter(title => title !== null);
        setRegions(titles);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>{t('loading_regions')}</p>;

  return (
    <div>
      <label htmlFor="region-select">{t('select_region')}:</label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={e => onRegionChange(e.target.value)}
      >
        <option value="">{t('placeholder_select_region')}</option>
        {regions.map((r, i) => (
          <option key={i} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
