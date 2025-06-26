import React from "react";
import scratchLogo from "../scratch.png";

const Header = () => {
  return (
    <header className="w-full bg-violet-500 text-white py-1 px-4 shadow-md flex items-center justify-between">
      <img
        src={scratchLogo}
        alt="App Logo"
        className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-full shadow-sm"
      />
      <nav className="space-x-4 text-xs sm:text-sm">
        <a href="#" className="text-white hover:underline">Home</a>
        <a href="#" className="text-white hover:underline">About</a>
        <a href="#" className="text-white hover:underline">Docs</a>
      </nav>
    </header>
  );
};

export default Header;
