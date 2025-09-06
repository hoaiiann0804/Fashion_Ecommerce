import { Check, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import bg3 from '../../assets/image/old-fashion-rotary-dial-phone-antique-technology-concept-white-rustic-wooden-background-152862950.webp';
import Breadcrumb from "../../components/BreadCrumb";
import { GetInformation } from "../../service/User.Service";

const ContactPage = () => {
  const [address, setAddress] = useState('288 D. Bá Trạc, Phường Rạch Ông, Quận 8, Hồ Chí Minh, Việt Nam');
  const [userInfor, setUserInfor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e) => {
    setAddress(e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;
      try {
        const response = await GetInformation(token);
        setUserInfor(response.user_Inf);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="pt-[60px]">
    <div className="bg-gray-50 min-h-screen ">
      {/* Hero Section */}
      <div className="relative">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-64 md:h-96 w-full ">
          <img 
            src={bg3}
            alt="Fashion Blog Hero" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white ">
            <h1 className="text-3xl md:text-5xl font-bold text-center">Trang Liên Hệ </h1>
            <Breadcrumb   items={[{ label: 'Sản phẩm yêu thích ' }]} />
    
            {/* Search Bar */}
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side - Contact Info */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Thông Tin Liên Hệ
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-full mr-4">
                    <MapPin className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Địa Chỉ</h3>
                    <p className="text-gray-600">
                      123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-full mr-4">
                    <Phone className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Hotline</h3>
                    <p className="text-gray-600">
                      <a href="tel:1900123456" className="hover:text-black">
                        1900 123 456
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-full mr-4">
                    <Mail className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:support@fashionstore.com" className="hover:text-black">
                        support@fashionstore.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-full mr-4">
                    <Clock className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Giờ Làm Việc</h3>
                    <p className="text-gray-600">Thứ 2 - Thứ 7: 9:00 - 21:00</p>
                    <p className="text-gray-600">Chủ nhật: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Kết Nối Với Chúng Tôi
              </h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </a>
                <a href="#" className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778C2.036 8.746 2 12 2 12s.036 3.259.403 4.816a2.5 2.5 0 001.767 1.763c1.566.434 7.83.437 7.83.437s6.265.007 7.831-.403a2.5 2.5 0 001.767-1.763C22 15.253 22 12 22 12s0-3.252-.407-4.797zM10 15V9l5.2 3-5.2 3z" />
                  </svg>
                </a>
                <a href="#" className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-gray-900 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
                  <Check className="text-green-500 mr-2 h-5 w-5" />
                  <p className="text-green-700">
                    Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Inputs */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || userInfor?.USER_LAST_NAME || ""}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Nhập họ tên của bạn"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || userInfor?.USER_EMAIL || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || userInfor?.USER_PHONE || ""}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="0xxxxxxxxx"
                      />
                    </div>
                  </div>

                  {/* Right Column: Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung tin nhắn <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="9"
                      maxLength={500}
                      required
                      className="w-full h-[77%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      placeholder="Nhập nội dung tin nhắn của bạn (tối đa 500 ký tự)..."
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 ký tự
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="bg-[#6666e5] text-white py-3 px-6 rounded-md hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Gửi tin nhắn
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Nhập địa chỉ để xem bản đồ</h2>
      <input
        type="text"
        value={address}
        onChange={handleChange}
        placeholder="Nhập địa chỉ..."
        className="w-full border p-2 rounded mb-4"
      />
      <div className="w-full h-[400px]">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Chính sách đổi trả như thế nào?
              </h3>
              <p className="text-gray-600">
                Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm còn nguyên tem mác và không có dấu hiệu đã qua sử dụng.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Thời gian giao hàng mất bao lâu?
              </h3>
              <p className="text-gray-600">
                Thời gian giao hàng từ 2-3 ngày đối với nội thành và 3-5 ngày đối với các tỉnh thành khác.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Làm sao để biết size quần áo phù hợp?
              </h3>
              <p className="text-gray-600">
                Bạn có thể tham khảo bảng size chi tiết trong mỗi sản phẩm hoặc liên hệ với chúng tôi để được tư vấn cụ thể.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Có thể thanh toán bằng những hình thức nào?
              </h3>
              <p className="text-gray-600">
                Chúng tôi chấp nhận thanh toán COD, chuyển khoản ngân hàng, và các ví điện tử phổ biến như Momo, ZaloPay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;