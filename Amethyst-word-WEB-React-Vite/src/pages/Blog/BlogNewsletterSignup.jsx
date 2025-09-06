import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const BlogNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Địa chỉ email không hợp lệ');
      return;
    }

    // In a real app, you would send this to your API
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Mail className="text-blue-500 mr-2" size={20} />
        Đăng Ký Nhận Bản Tin
      </h3>
      
      {isSubmitted ? (
        <div className="bg-green-50 p-4 rounded-lg flex items-start">
          <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-green-800 font-medium">Đăng ký thành công!</p>
            <p className="text-green-600 text-sm mt-1">
              Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi những bài viết mới nhất về thời trang đến email của bạn.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            Đăng ký để nhận thông báo về bài viết mới và khuyến mãi đặc biệt!
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Đăng Ký
            </button>
          </form>
          
          <p className="text-gray-500 text-xs mt-3">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của chúng tôi.
          </p>
        </>
      )}
    </div>
  );
};

export default BlogNewsletterSignup;