import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] bg-purple-100">
      <div className="absolute inset-0 bg-gradient-to-r from-fashion-purple-200/40 to-fashion-purple-100/30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold text-fashion-purple-800 mb-4 animate-fade-in">
          About Us
        </h1>
        <div className="text-fashion-purple-600 flex items-center space-x-2 animate-fade-in">
          <Link to="/" className="hover:text-fashion-purple-700 transition-colors">Home</Link>
          <span>/</span>
          <span>About Us</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;