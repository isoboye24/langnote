'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="w-full ">
      <div className="wrapper flex-between">
        <div className="">
          <Navbar toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
