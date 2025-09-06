import React from 'react';
import { Star, MessageCircle, Share2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post = {} }) => {
  const { id, title, excerpt, category, author, date, image, rating, commentCount } = post;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400" size={16} />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-gray-300" size={16} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />);
    }

    return stars;
  };
  if (!id) {
    console.error('BlogPostCard: Missing post ID');
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <Link to={`/blog/${id}`}>
        <img src={image} alt={title} className="w-full h-48 md:h-56 object-cover" />
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {category}
          </span>
          <span className="text-gray-500 text-sm">{formatDate(date)}</span>
        </div>
        <Link to={`/blog/${id}`} className="block">
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            {renderStars(rating)}
            <span className="ml-1 text-sm text-gray-500">({rating})</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MessageCircle size={16} className="mr-1" />
            <span className="text-sm">{commentCount}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">Bởi <span className="font-medium">{author}</span></span>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors" aria-label="Chia sẻ">
              <Share2 size={16} />
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors" aria-label="Xem sản phẩm liên quan">
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;