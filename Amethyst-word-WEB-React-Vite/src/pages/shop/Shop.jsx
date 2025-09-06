// // import React, { useEffect, useState, useCallback } from "react";




import { Filter, Grid, List, X } from 'lucide-react';
import { useEffect, useState, useCallback } from "react";
import Breadcrumb from '../../components/BreadCrumb';
import FashionPagination from "../../components/panigation/Panigation";
import ProductFilters from '../../pages/products/ProductFilter';
import ProductSort from '../../pages/products/ProductSort';
import AllProductListCard from '../products/AllProductListCard'
import AllProductCard from '../products/AllProductCard';
import { ProductFilter } from '../../service/Product.Service';
import bg1 from '../../assets/image/pngtree-sustainable-fashion-featuring-clothes-made-from-organic-and-recycled-fabrics-on-picture-image_15873419.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('grid')}
        aria-label="Chế độ xem lưới"
      >
        <Grid size={18} />
      </button>
      <button
        className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('list')}
        aria-label="Chế độ xem danh sách"
      >
        <List size={18} />
      </button>
    </div>
  );
};

const Shop = () => {
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const location = useLocation();
  const navigate = useNavigate();

  const parsed = queryString.parse(location.search, { arrayFormat: 'comma' });
  const [filters, setFilters] = useState({
    categoryId: parsed.categoryId ? (Array.isArray(parsed.categoryId) ? parsed.categoryId.map(Number) : [Number(parsed.categoryId)]) : [],
    brandId: parsed.brandId ? (Array.isArray(parsed.brandId) ? parsed.brandId.map(Number) : [Number(parsed.brandId)]) : [],
    pageNumber: parsed.pageNumber ? Number(parsed.pageNumber) : 1,
    pageSize: parsed.pageSize ? Number(parsed.pageSize) : 8,
    priceMin: parsed.priceMin ? Number(parsed.priceMin) : 0,
    pricaMax: parsed.pricaMax ? Number(parsed.pricaMax) : 10000000,
  });

  useEffect(() => {
    setFilters({
      categoryId: parsed.categoryId ? (Array.isArray(parsed.categoryId) ? parsed.categoryId.map(Number) : [Number(parsed.categoryId)]) : [],
      brandId: parsed.brandId ? (Array.isArray(parsed.brandId) ? parsed.brandId.map(Number) : [Number(parsed.brandId)]) : [],
      pageNumber: parsed.pageNumber ? Number(parsed.pageNumber) : 1,
      pageSize: parsed.pageSize ? Number(parsed.pageSize) : 8,
      priceMin: parsed.priceMin ? Number(parsed.priceMin) : 0,
      pricaMax: parsed.pricaMax ? Number(parsed.pricaMax) : 10000000,
    });
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  const fetchProducts = useCallback(async () => {
    const cacheKey = JSON.stringify(filters);
    if (cache[cacheKey]) {
      setProducts(cache[cacheKey].data);
      setTotalPages(cache[cacheKey].totalPages);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await ProductFilter(
        filters.brandId,
        filters.categoryId,
        filters.priceMin,
        filters.pricaMax,
        filters.pageNumber,
        filters.pageSize
      );
      setProducts(response.data || []);
      setTotalPages(response.totalPages || 1);
      setCache(prev => ({
        ...prev,
        [cacheKey]: { data: response.data || [], totalPages: response.totalPages || 1 }
      }));
    } catch (error) {
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [filters, cache]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        ...newFilters,
        categoryId: newFilters.categoryId !== undefined ? newFilters.categoryId : prev.categoryId,
        brandId: newFilters.brandId !== undefined ? newFilters.brandId : prev.brandId,
        priceMin: newFilters.priceMin !== undefined ? newFilters.priceMin : prev.priceMin,
        pricaMax: newFilters.pricaMax !== undefined ? newFilters.pricaMax : prev.pricaMax,
        pageNumber: newFilters.pageNumber || 1,
      };
      const query = queryString.stringify({
        ...updatedFilters,
        categoryId: updatedFilters.categoryId.length > 0 ? updatedFilters.categoryId : undefined,
        brandId: updatedFilters.brandId.length > 0 ? updatedFilters.brandId : undefined,
      }, { arrayFormat: 'comma' });
      navigate(`?${query}`);
      return updatedFilters;
    });
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const handlePageChange = useCallback(async (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    setCurrentPage(pageNumber);
    setFilters(prev => {
      const updated = { ...prev, pageNumber };
      const query = queryString.stringify({
        ...updated,
        categoryId: updated.categoryId.length > 0 ? updated.categoryId : undefined,
        brandId: updated.brandId.length > 0 ? updated.brandId : undefined,
      }, { arrayFormat: 'comma' });
      navigate(`?${query}`);
      return updated;
    });
  }, [navigate]);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
    setFilters(prev => {
      const updated = {
        ...prev,
        pageSize: mode === 'grid' ? 8 : 5,
        pageNumber: 1
      };
      const query = queryString.stringify({
        ...updated,
        categoryId: updated.categoryId.length > 0 ? updated.categoryId : undefined,
        brandId: updated.brandId.length > 0 ? updated.brandId : undefined,
      }, { arrayFormat: 'comma' });
      navigate(`?${query}`);
      return updated;
    });
    setCurrentPage(1);
  }, [navigate]);

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col min-h-screen bg-white">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-blue-400 h-64 md:h-96 w-full">
            <img 
              src={bg1}
              alt="Fashion Blog Hero" 
              className="w-full h-full object-cover object-center opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center">Tất cả sản phẩm</h1>
              <Breadcrumb items={[{ label: 'Tất cả sản phẩm' }]} />
            </div>
          </div>
        </div>

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
              <ProductFilters onFilterChange={handleFilterChange} initialFilters={filters} />
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:hidden w-full flex justify-between items-center py-2">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded-md"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
            <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
              <ProductFilters onFilterChange={handleFilterChange} initialFilters={filters} />
            </div>
            <div className="w-full md:w-3/4 lg:w-4/5 p-2">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {products.length} sản phẩm
                </div>
                <div className="flex items-center gap-4">
                  <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                  <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <span className="animate-pulse">Đang tải sản phẩm...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8">Không tìm thấy sản phẩm nào</div>
              ) : (
                <>
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.map(product => (
                        <AllProductCard 
                          key={product.producT_ID} 
                          product={product} 
                        />
                      ))}
                    </div>
                  )}
                  {viewMode === 'list' && (
                    <div className="flex flex-col gap-4">
                      {products.map(product => (
                        <AllProductListCard 
                          key={product.producT_ID} 
                          product={product} 
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              {!loading && totalPages > 0 && (
                <div className="mt-8">
                  <FashionPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

