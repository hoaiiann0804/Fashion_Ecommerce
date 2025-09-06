import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingBag, Globe } from 'lucide-react';

const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/api/placeholder/40/40" alt="Logo" className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl text-gray-800">FashionBlog</span>
            </Link>
          </div> */}
          
          {/* <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">Trang chủ</Link>
            <Link to="/blog" className="text-blue-500 font-medium">Blog</Link>
            <Link to="/shop" className="text-gray-600 hover:text-blue-500 font-medium">Cửa hàng</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-500 font-medium">Giới thiệu</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 font-medium">Liên hệ</Link>
          </nav> */}
          
          {/* <div className="hidden md:flex items-center space-x-6">
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/account" className="text-gray-600 hover:text-blue-500">
              <User size={20} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-500 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            <div className="flex items-center text-gray-600 hover:text-blue-500">
              <Globe size={20} />
              <select className="ml-1 text-sm bg-transparent border-none focus:ring-0">
                <option value="vi">VN</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div> */}
          
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-gray-600 hover:text-blue-500 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isSearchOpen && (
          <div className="py-3 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {/* {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="py-2 text-gray-600 hover:text-blue-500 font-medium">Trang chủ</Link>
              <Link to="/blog" className="py-2 text-blue-500 font-medium">Blog</Link>
              <Link to="/shop" className="py-2 text-gray-600 hover:text-blue-500 font-medium">Cửa hàng</Link>
              <Link to="/about" className="py-2 text-gray-600 hover:text-blue-500 font-medium">Giới thiệu</Link>
              <Link to="/contact" className="py-2 text-gray-600 hover:text-blue-500 font-medium">Liên hệ</Link>
              <Link to="/account" className="py-2 text-gray-600 hover:text-blue-500 font-medium">Tài khoản</Link>
              <div className="flex items-center py-2 text-gray-600">
                <Globe size={20} className="mr-2" />
                <select className="bg-transparent border-none focus:ring-0">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
            </nav>
          </div>
        </div>
      )} */}
    </header>
  );
}; 

export default BlogHeader;