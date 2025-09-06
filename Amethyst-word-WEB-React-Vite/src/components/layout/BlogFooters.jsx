import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const BlogFooter = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Về FashionBlog</h3>
            <p className="text-gray-300 mb-4">
              FashionBlog là nơi chia sẻ xu hướng thời trang mới nhất, mẹo phối đồ và hướng dẫn mua sắm thông minh cho mọi người yêu thích thời trang.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Trang chủ</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Cửa hàng</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">Giới thiệu</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/category/xu-huong-thoi-trang" className="text-gray-300 hover:text-white transition-colors">
                  Xu hướng thời trang
                </Link>
              </li>
              <li>
                <Link to="/blog/category/huong-dan-mua-sam" className="text-gray-300 hover:text-white transition-colors">
                  Hướng dẫn mua sắm
                </Link>
              </li>
              <li>
                <Link to="/blog/category/lich-su-thoi-trang" className="text-gray-300 hover:text-white transition-colors">
                  Lịch sử thời trang
                </Link>
              </li>
              <li>
                <Link to="/blog/category/chia-se-tu-nguoi-noi-tieng" className="text-gray-300 hover:text-white transition-colors">
                  Chia sẻ từ người nổi tiếng
                </Link>
              </li>
              <li>
                <Link to="/blog/category/meo-phoi-do" className="text-gray-300 hover:text-white transition-colors">
                  Mẹo phối đồ
                </Link>
              </li>
              <li>
                <Link to="/blog/category/bao-quan-quan-ao" className="text-gray-300 hover:text-white transition-colors">
                  Bảo quản quần áo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-blue-400 mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">123 Đường Thời Trang, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-400 mr-2 flex-shrink-0" size={18} />
                <span className="text-gray-300">+84 (0) 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-400 mr-2 flex-shrink-0" size={18} />
                <span className="text-gray-300">info@fashionblog.com</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Giờ Làm Việc:</h4>
              <p className="text-gray-300">
                Thứ 2 - Thứ 6: 9:00 - 18:00<br />
                Thứ 7: 9:00 - 16:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 FashionBlog. Tất cả các quyền được bảo lưu.
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors">
                Chính sách cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;