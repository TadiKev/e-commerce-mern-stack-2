import React from 'react';
import logo from '../assets/logo.svg';
import ProfileImg from '../assets/profile.png';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center bg-white py-4 px-6 shadow-md border-b border-gray-200">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="uppercase font-bold text-lg text-white bg-secondary px-4 py-2 rounded-md tracking-widest max-sx:text-base max-sx:py-1 max-xs:px-1">
        Admin Panel
      </div>
      <div className="h-12 w-12 rounded-full overflow-hidden">
        <img src={ProfileImg} alt="Profile" className="h-full w-full object-cover" />
      </div>
    </nav>
  );
};

export default Navbar;
