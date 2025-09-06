import React, { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem"; 
import Breadcrumb from "../../components/BreadCrumb";
import FashionPagination from "../../components/panigation/Panigation";
import { GetWishList } from "../../service/WishList.Service";
import { toast } from "react-toastify";
import bg1 from '../../assets/image/Taobao Banner Clothing Background, Color, Warm, Flat Background Image And Wallpaper for Free Download.jpeg'
import { useWishlist } from "../../context/WishListContext";
import { kebabCase } from "lodash";
const Wishlist = () => {
  const [wishlist,setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const {updateWishListCount} = useWishlist();
  useEffect(() => {
    const fetchWishList = async () => {
      if (!token) {
        toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await GetWishList(token);
        if (response.code === 200) {
          setWishList(response.data)
        
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi lấy danh sách yêu thích');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishList();
  }, [token]);

  const handleDelete = async (deletedItem) => {
    setWishList((prevWishlist) => 
      prevWishlist.filter((item) => item.producT_ID !== deletedItem.producT_ID)
    );
  };

  const itemsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1); 
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = wishlist.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='pt-[60px]'>
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full">
          <img 
            src={bg1}
            alt="Fashion Blog Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Sản phẩm yêu thích</h1>
            <Breadcrumb items={[{ label: 'Sản phẩm yêu thích' }]} />
          </div>
        </div>
      </div>
      <div className="justify-center items-center max-w-auto p-20">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Sản phẩm yêu thích</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {isLoading ? (
              <div>Đang tải...</div>    
            ) : wishlist.length > 0 ? (
              currentItems.map(item => (
                <WishlistItem key={item.producT_ID} item={item} OnDelete={handleDelete} />
              ))
            ) : (
              <div>Không có sản phẩm yêu thích nào</div>
            )}
          </div>
        <FashionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Wishlist