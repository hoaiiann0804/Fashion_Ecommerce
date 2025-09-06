import React from 'react';
import { 
  FaTshirt, 
  FaShoppingBag, 
  FaShoePrints, 
  FaHatCowboy, 
  FaGlasses 
} from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';

export const getCategoryIcon = (categoryName) => {
  const iconMap = {
    "Thời trang Nam": <FaTshirt />,
    "Thời trang Nữ": <FaShoppingBag />,
    "Giày dép": <FaShoePrints />,
    "Phụ kiện": <FaHatCowboy />,
    "Trang sức": <BiTimeFive />,
    "Kính mát": <FaGlasses />
  };

  return iconMap[categoryName] || null
};