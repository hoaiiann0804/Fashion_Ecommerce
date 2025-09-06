import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../../utils/formatUtils';
import { getProductImage } from '../../../service/Product.Service';
const API_IMAGE = import.meta.env.VITE_API_IMAGE;

/**
 * Render stars based on rating
 * @param {Object} props
 * @param {Object} props.product -
 * @param {number} props.product.id 
 * @param {string} props.product.
 * @param {number} props.product.price 
 * @param {string} props.product.src 
 * @param {string} props.product.alt 
 */
const renderStars = (rating) => {
  return (
    <div class="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          class={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ProductRelateCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] =useState('')
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getProductImage(product.producT_ID);
        setImageUrl(response[0].imagE_NAME);
      } catch (error) {
        console.error('Error fetching product image:', error);
      }
    };
  
    fetchImage();
  }, [product.producT_ID]);

  return (
    <div class="bg-white rounded-lg shadow-md overflow-hidden group">
      <div class="relative">
      <img
               src={imageUrl ? `${API_IMAGE}/${imageUrl}` : '/placeholder-image.jpg'}
            alt={product.alt}
            className="w-full h-64 object-cover transition-transform group-hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          />
        {product.isNew && (
          <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            MỚI
          </div>
        )}

        {product.salePrice && (
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            GIẢM GIÁ
          </div>
        )}
        <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button class="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
            <FaShoppingCart size={18} />
          </button>
          <button class="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors">
            <FaHeart size={18} />
          </button>
          <button
            class="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => navigate(`/details/${product.producT_ID  }`)}
          >
            <FaEye size={18} />
          </button>
        </div>
      </div>

      <div class="p-4">
        <h3
          class="font-medium text-gray-800 hover:text-blue-500 transition-colors mb-1 cursor-pointer text-center"
          onClick={() => navigate(`/details/${product.producT_ID}`)}
        >
          {product.producT_NAME}
        </h3>
        <div class="flex items-center justify-center mb-2">
          {renderStars(product.rating)}
          <span class="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
        </div>
        <div class="flex items-center justify-between">
          <div> 
            {product.salePrice ? (
              <>
                <span class="font-medium text-red-500">{formatPrice(product.salePrice)}</span>
                <span class="text-gray-400 text-sm line-through ml-1">{formatPrice(product.producT_PRICE)}</span>
              </>
            ) : (
              <span class="font-medium text-gray-800">{formatPrice(product.producT_PRICE)}</span>
            )}
          </div>
          <button
            class="text-blue-500 text-sm hover:underline"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRelateCard

