import React from 'react';
import { Link } from 'react-router-dom';
const SaleBanner = () => {
  return (
    <Link to="/shop">
    <button  className="w-full h-full pl-18 p-7">
      <div className="relative w-full h-full bg-pink-600 rounded-md overflow-hidden flex flex-col items-center justify-between py-4">
        {/* Logo */}
        <div className="text-white text-4xl font-bold mb-2">AmethystWorld</div>

        {/* Đường may bên trái */}
        <div className="absolute left-4 top-0 h-full w-px border-l border-dashed border-white opacity-70"></div>

        {/* Chấm tròn trên đường may */}
        <div className="absolute left-4 top-1/4 w-3 h-3 bg-white rounded-full transform -translate-x-1/2"></div>
        <div className="absolute left-4 top-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2"></div>
        <div className="absolute left-4 top-3/4 w-3 h-3 bg-white rounded-full transform -translate-x-1/2"></div>

        {/* GIẢM ĐẾN */}
        <div className="w-3/5 relative mb-1">
          <div className="border-2 border-white py-1 px-4 w-full flex justify-center">
            <p className="text-white font-bold text-lg">GIẢM ĐẾN</p>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-white border-l-transparent border-r-transparent"></div>
        </div>

        {/* 60% */}
        <div className="flex justify-center items-center my-2">
          <div className="text-white text-8xl font-bold flex items-center relative">
            <span className="relative mr-1">
              6
              <div className="absolute top-1/2 left-0 w-16 h-8 bg-yellow-300 transform -rotate-6 -translate-y-1/2 -z-10"></div>
            </span>
            <span>0</span>
            <span className="text-4xl ml-1">%</span>
          </div>
        </div>

        {/* KHÔNG KÈM ĐIỀU KIỆN */}
        <div className="flex flex-col items-center my-1 w-full">
          <div className="w-4/5 border-t border-white"></div>
          <p className="text-white font-bold text-base py-2">KHÔNG KÈM ĐIỀU KIỆN</p>
          <div className="w-4/5 border-t border-white"></div>
        </div>

        {/* Biểu tượng ❄ */}
        <div className="flex justify-center mb-1">
          <span className="text-white text-2xl">❄</span>
        </div>

        {/* Trang trí bên phải */}
        <div className="absolute right-0 bottom-0 opacity-20">
          <div className="text-white text-6xl">❆</div>
        </div>
        <div className="absolute right-8 top-1/3 opacity-20">
          <div className="text-white text-4xl">❅</div>
        </div>
      </div>
    </button>
    </Link>
  );
};

export default SaleBanner;
