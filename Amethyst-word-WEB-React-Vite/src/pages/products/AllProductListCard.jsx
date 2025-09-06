import { FaEye, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../../service/Cart.Service';
import { AddWishList } from '../../service/WishList.Service';
import { formatPrice } from '../../utils/formatUtils';
import { useWishlist } from '../../context/WishListContext';
import { getProductImage } from '../../service/Product.Service';
import { useEffect, useState } from 'react';
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

const AllProductsListCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState('');
  const { incrementCount } = useWishlist();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // const handleAddToCart = async () => {
  //   try {
  //     if (!token) {
  //       toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
  //       return;
  //     }
  //     const res = await addToCart(token, product.producT_ID, 1);
  //     if (res.code === 201) {
  //       toast.success('Thêm vào giỏ hàng thành công');
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //     toast.error('Thêm vào giỏ hàng thất bại');
  //   }
  // };
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
    fetchImage()
  },[product.producT_ID])
  const handleAddToWishList = async () => {
    if (token) {
      const response = await AddWishList(token, product.producT_ID);
      if (response.code === 201) {
        toast.success('Thêm vào danh sách yêu thích thành công!');
        incrementCount();
      } else {
        toast.error(response.message || 'Thêm vào danh sách yêu thích thất bại!');
      }
    } else {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.');
    }
  };

  // const isNew = product.producT_PRICE;
  const isOnSale = product.discounT_PERCENT ;
  // const isBestSeller = product.isBestSeller;
  const displayPrice = product.salePrice || (isOnSale ? product.producT_PRICE * (1 - product.discounT_PERCENT / 100) : product.producT_PRICE);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-64">
          <img
            // src={product.imagE_NAME ? `https://i.imgur.com/${product.imagE_NAME}.jpg` : '/placeholder-image.jpg'}
             src={imageUrl? `${API_IMAGE}/${imageUrl}` : '/placeholder-image.jpg'}
            alt={product.producT_NAME || product.alt}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/details/${product.producT_ID}`)}
          />
          {isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
             GIẢM GIÁ {product.discounT_PERCENT}%
            </div>
          )}
       
        </div>
        <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3
                  className="text-2xl font-medium text-gray-800 hover:text-blue-500 transition-colors cursor-pointer"
                  onClick={() => navigate(`/details/${product.producT_ID}`)}
                >
                  {product.producT_NAME}
                </h3>
                <div className="flex items-center mt-5">
                  {renderStars(product.rate)}
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0} đánh giá)</span>
                </div>
              </div>
              <div className="text-right">
                {isOnSale ? (
                  <div className="flex flex-col">
                    <span className="font-medium text-red-500 text-lg">{formatPrice(displayPrice)}</span>
                    <span className="text-gray-400 text-sm line-through">{formatPrice(product.producT_PRICE)}</span>
                  </div>
                ) : (
                  <span className="font-medium text-gray-800 text-lg">{formatPrice(displayPrice)}</span>
                )}
              </div>
            </div>
            {product.description && (
              <p className="text-gray-600 text-sm my-2 line-clamp-2">{product.description}</p>
            )}
            {product.attributes && (
              <div className="flex flex-wrap gap-2 my-2">
                {product.attributes.map((attr, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {attr}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                onClick={() => navigate(`/details/${product.producT_ID}`)}
              >
                <FaEye size={16} />
                <span className="hidden sm:inline">Xem chi tiết</span>
              </button>
              <button
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition-colors flex items-center gap-1"
                onClick={handleAddToWishList}
              >
                <FaHeart size={16} className="text-red Venmo" />
                <span className="hidden sm:inline">Yêu thích</span>
              </button>
            </div>
            <button
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
              onClick={() => navigate(`/details/${product.producT_ID}`)}
            >
              <FaShoppingCart size={16} />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductsListCard;