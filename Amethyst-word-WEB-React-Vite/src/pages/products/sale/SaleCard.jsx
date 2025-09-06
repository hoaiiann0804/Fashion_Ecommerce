/** @file src/components/product/bestSeller/BestSellerCard.jsx */
// import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWishlist } from '../../../context/WishListContext';
import { getProductImage } from '../../../service/Product.Service';
import { AddWishList } from '../../../service/WishList.Service';
import { formatPrice } from '../../../utils/formatUtils';
const API_URL = import.meta.env.VITE_API_URL;

const API_IMAGE = import.meta.env.VITE_API_IMAGE;
const renderStars = (rating) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};


const SaleCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState('');
  const {incrementCount} = useWishlist();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    const fetchImage = async () => {
      try{
        const response = await getProductImage(product.producT_ID);
        setImageUrl(response[0].imagE_NAME);  
      }
      catch(error){
        console.error('Error fetching product image:', error);
      }
    }
    fetchImage();
  },[])
  const AddToWishList = async () => {
      if (token) {
        const response = await AddWishList(token, product.producT_ID);
        if(response.code === 201) {
          toast.success('Thêm vào danh sách yêu thích thành công!');
          incrementCount()
        } else {
          toast.error(response.message || 'Thêm vào danh sách yêu thích thất bại!');
        }
      } else {
        toast.error('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
      }
    }

  return (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group">
        <div className="relative">
          <img
            src={imageUrl ? `${API_IMAGE}/${imageUrl}` : '/placeholder-image.jpg'}
            alt={product.alt}
            className="w-full h-64 object-cover transition-transform group-hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          />
  
          {/* Badge giảm giá */}
          {product.discounT_PERCENT && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              GIẢM GIÁ {product.discounT_PERCENT}%
            </div>
          )}
  
          {/* Hover buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors" onClick={AddToWishList}>
              <FaHeart size={18} />
            </button>
            <button
              className="bg-white text-gray-800 rounded-full p-2 hover:bg-blue-500 hover:text-white transition-colors"
              onClick={() => navigate(`/details/${product.producT_ID}`)}
            >
              <FaEye size={18} />
            </button>
          </div>
        </div>
  
        <div className="p-4">
          <h3
            className="font-medium text-gray-800 hover:text-blue-500 transition-colors mb-1 cursor-pointer text-center"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          >
            {product.producT_NAME}
          </h3>
  
          {/* Đánh giá sao */}
          <div className="flex items-center justify-center mb-2">
            {renderStars(product.rate)}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
          </div>
  
          {/* Giá sản phẩm */}
          <div className="flex items-center justify-between">
            <div>
              {product.discounT_PERCENT ? (
                <>
                  <span className="font-medium text-red-500">{formatPrice(product.producT_PRICE - (product.producT_PRICE * product.discounT_PERCENT / 100))}</span>
                </>
              ) : (
                <span className="font-medium text-gray-800">{formatPrice(product.producT_PRICE)}</span>
              )}
            </div>
            <button
              className="text-blue-500 text-sm hover:underline"
              onClick={() => navigate(`/details/${product.producT_ID}`)}
            >
              Mua ngay
            </button>
          </div>
        </div>
  </div>
  );
};

export default SaleCard;