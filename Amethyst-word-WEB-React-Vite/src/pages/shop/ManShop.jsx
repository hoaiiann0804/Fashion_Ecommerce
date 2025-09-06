import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import ProductCard from "../products/new/ProductCard";
import { uniqueProducts } from "../../service/ProductData";
import PromotionBanner from '../../components/layout/PromotionBanner';
import Breadcrumb from '../../components/BreadCrumb';
import ProductSort from '../../pages/products/ProductSort';
import { Filter, X } from 'lucide-react';
import ProductFilters from '../../components/ui/ProductFilter';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from "react-router-dom";
import bg1 from '../../assets/image/banner03.jpg'
import FashionPagination from "../../components/panigation/Panigation";

const ManShop = () => {
  const [showPromotion, setShowPromotion] = useState(true);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Trạng thái cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Số sản phẩm hiển thị trên mỗi trang
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Xử lý phân trang
  useEffect(() => {
    // Tính toán tổng số trang
    const calculatedTotalPages = Math.ceil(uniqueProducts.length / productsPerPage);
    setTotalPages(calculatedTotalPages);
    
    // Lấy sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = uniqueProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    
    setDisplayedProducts(currentProducts);
  }, [currentPage, productsPerPage]);

  // Xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    // Cuộn lên đầu khi chuyển trang
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col min-h-screen bg-white">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full">
            <img 
              // src={bg1}
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Thời trang nam </h1>
              <Breadcrumb items={[{ label: 'Thời trang nam' }]} />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <ProductFilters />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="md:hidden w-full flex justify-between items-center py-2">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded-md"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Filters - Desktop */}
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
              <ProductFilters />
            </div>
            
            <div className="w-full md:w-3/4 lg:w-4/5 p-2">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {displayedProducts.length} trong tổng số {uniqueProducts.length} sản phẩm
                </div>
                <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>

              {/* Danh sách sản phẩm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div> 
              {totalPages > 1 && (
                <FashionPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
             
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ManShop;