import React from 'react';
import { ShoppingBag } from 'lucide-react';

const TopSale = () => {
  const products = [
    {
      id: 1,
      name: "Quần Short Nữ",
      price: "189.000đ",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&crop=center",
      category: "bottom"
    },
    {
      id: 2,
      name: "Áo Sơ Mi Nam",
      price: "259.000đ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
      category: "shirt"
    },
    {
      id: 3,
      name: "Áo Polo Nam",
      price: "249.000đ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=center",
      category: "polo"
    },
    {
      id: 4,
      name: "Set Áo Váy Nữ",
      price: "195.000đ",
      image: "https://images.unsplash.com/photo-1494790108755-2616c78746a5?w=300&h=400&fit=crop&crop=center",
      category: "dress"
    },
    {
      id: 5,
      name: "Áo Crop Top",
      price: "99.000đ",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=center",
      category: "top"
    },
    {
      id: 6,
      name: "Váy Maxi Xanh",
      price: "199.000đ",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=center",
      category: "dress"
    }
  ];

  return (
    <div className='p-8 flex flex-col items-center'>
    <div className=" w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 ">
      <div className="max-w-2xl mx-auto">
 
        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-3 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                  <ShoppingBag className="w-4 h-4 text-pink-600" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2 text-sm line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">
                    {product.price}
                  </span>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <button className="bg-white hover:bg-pink-50 text-pink-600 px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border-2 border-pink-200">
            Xem thêm sản phẩm
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TopSale;