import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const handleCheckboxChange = (e) => {
    setDarkMode(e.target.checked);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <label className="flex items-center space-x-2 dark:text-gray-200">
      <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <input
        type="checkbox"
        className="toggle theme-controller"
        checked={darkMode}
        onChange={handleCheckboxChange}
      />
    </label>
  );
};

export default ThemeToggle;
