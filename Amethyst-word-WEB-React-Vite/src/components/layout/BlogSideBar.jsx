import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Tag, Clock } from 'lucide-react';

const BlogSidebar = ({ popularPosts, categories }) => {
  return (
    <div className="space-y-8">
      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-blue-500 mr-2" size={20} />
          <h3 className="text-lg font-bold">Bài Viết Phổ Biến</h3>
        </div>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex space-x-3">
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <Link
                  to={`/blog/${post.id}`}
                  className="font-medium hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {new Date(post.date).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Tag className="text-blue-500 mr-2" size={20} />
          <h3 className="text-lg font-bold">Danh Mục</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/blog/category/${encodeURIComponent(category)}`}
              className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded transition-colors"
            >
              <span>{category}</span>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {Math.floor(Math.random() * 20) + 1}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Từ Khóa</h3>
        <div className="flex flex-wrap gap-2">
          {['Thời trang', 'Phong cách', 'Mùa hè', 'Xu hướng', 'Phụ kiện', 'Giày dép', 'Túi xách', 'Áo khoác', 'Quần jean', 'Đầm', 'Váy'].map((tag) => (
            <Link
              key={tag}
              to={`/blog/tag/${encodeURIComponent(tag)}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Advertisement */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-md text-white text-center">
        <h3 className="font-bold text-lg mb-2">Bộ sưu tập mới</h3>
        <p className="mb-4">Khám phá BST mùa hè 2025 với ưu đãi đặc biệt</p>
        <img src="/api/placeholder/300/150" alt="Summer Collection" className="w-full h-32 object-cover rounded mb-4" />
        <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default BlogSidebar;