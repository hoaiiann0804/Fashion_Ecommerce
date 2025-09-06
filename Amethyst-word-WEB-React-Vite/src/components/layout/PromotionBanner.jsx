import React from 'react';
import { X } from 'lucide-react';

const PromotionBanner = ({ onClose }) => {
  return (
    <div className="bg-blue-600 text-white py-2 relative">
      <div className="container mx-auto px-4 text-center">
        <p className="font-medium">
          Giảm giá 20% cho tất cả sản phẩm mới! Sử dụng mã: <span className="font-bold">XUANHÈ2025</span>
        </p>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-blue-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default PromotionBanner;