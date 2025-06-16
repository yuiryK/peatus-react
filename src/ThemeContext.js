import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 1. При создании читаем из localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // по умолчанию светлая
  });

  // 2. Когда тема меняется — сохраняем в localStorage и применяем класс
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
