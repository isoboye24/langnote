import React from 'react';
import Navbar from './navbar';

const Header = () => {
  return (
    <header className="w-full ">
      <div className="wrapper flex-between">
        <div className="bg-amber-600">
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
