// WishlistItem.jsx
import { useState } from "react";
import { IoHeartDislike } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../../context/WishListContext";
import { DeleteWishList } from "../../service/WishList.Service";
import { formatPrice } from '../../utils/formatUtils';
const API_URL = import.meta.env.VITE_API_URL;
const API_IMAGE = import.meta.env.VITE_API_IMAGE;
const WishlistItem = ({ item, OnDelete}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate()
  const {decrementCount, updateWishListCount} = useWishlist();
  const token = localStorage.getItem('token');
  
  const DeleteToWishList = async () => {
    if (!token || isDeleting) {
      if(!token)
      {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này");
      }
      return;
    }
    
    setIsDeleting(true)
    try {
      const response = await DeleteWishList(token, item.producT_ID);
      if (response && (response.code === 201 || response.code === 200 || response.code === undefined || response.code === null)) {
        decrementCount();
        OnDelete(item);
        toast.success('Xóa sản phẩm khỏi danh sách yêu thích thành công!');
      } else {
        toast.error(response.message || 'Xóa sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm');
    }
    finally{
      setIsDeleting(false);
    }
  }
  return (
    
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group hover:shadow-md transition">
      <div className="aspect-h-4 aspect-w-3 relative overflow-hidden">
      <img
          src={item.imagE_NAME ? `${API_IMAGE}/${item.imagE_NAME}` : '/placeholder-image.jpg'}
          alt={item.alt}
          className="w-full h-56 object-cover transition-transform group-hover:scale-105 cursor-pointer"
          onClick={() => navigate(`/details/${item.producT_ID}`)}
        />
        {/* Badge giảm giá */}
          {item.discounT_PERCENT && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              GIẢM GIÁ {item.discounT_PERCENT}%
            </div>
          )}
        <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-700 hover:text-red-500 hover:bg-white transition"
        onClick={DeleteToWishList} >
          <IoHeartDislike size={20} className="fill-current " />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl text-purple-600 font-medium mb-2 line-clamp-2 min-h-12">
          {item.producT_NAME}
        </h3>
        {/* Giá sản phẩm */}
          <div className="flex items-center justify-between">
            <div>
              {item.discounT_PERCENT ? (
                <>
                  <span className="font-medium text-red-500">{formatPrice(item.producT_PRICE - (item.producT_PRICE * item.discounT_PERCENT / 100))}</span>
                </>
              ) : (
                <span className="font-medium text-gray-800">{formatPrice(item.producT_PRICE)}</span>
              )}
            </div>
            <button
              className="text-blue-500 text-sm hover:underline"
              onClick={() => navigate(`/details/${item.producT_ID}`)}
            >
              Mua ngay
            </button>
          </div>
      </div>
    </div>
  );
};

export default WishlistItem
