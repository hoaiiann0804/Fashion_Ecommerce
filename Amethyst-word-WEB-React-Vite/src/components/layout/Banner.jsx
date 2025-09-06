import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const FashionBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [banner, setBanner] = useState([]);
  const navigate = useNavigate();
  const slides = [
    {
      title: "Bộ Sưu Tập Mùa Hè 2025",
      subtitle: "Thời trang & Phụ kiện cao cấp",
      description: "Khám phá những xu hướng mới nhất với phong cách hiện đại và thanh lịch",
      buttonText: "Khám Phá Ngay",
      bgGradient: "from-pink-500/80 via-purple-600/80 to-indigo-700/80",
      accentColor: "text-pink-100",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "THỜI TRANG"
    },
    // {
    //   title: "Trang Sức Cao Cấp",
    //   subtitle: "Sang trọng & Tinh tế",
    //   description: "Những món trang sức độc đáo tôn vinh vẻ đẹp tự nhiên của bạn",
    //   buttonText: "Xem Bộ Sưu Tập",
    //   bgGradient: "from-amber-500/80 via-orange-600/80 to-red-600/80",
    //   accentColor: "text-yellow-100",
    //   imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    //   category: "TRANG SỨC"
    // },
    {
      title: "Phụ Kiện Thời Trang",
      subtitle: "Hoàn thiện phong cách",
      description: "Từ túi xách đến phụ kiện tóc - tất cả để bạn tỏa sáng, tôn lên cá tính riêng",
      buttonText: "Mua Sắm Ngay",
      bgGradient: "from-emerald-500/80 via-teal-600/80 to-blue-700/80",
      accentColor: "text-emerald-100",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2144&q=80",
      category: "PHỤ KIỆN"
    }
  ];


  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[70%] overflow-hidden px-4 py-12 sm:px-8 md:px-12 lg:p-28">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}></div>
        </div>
      ))}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-700"></div>

        <Sparkles className="absolute top-1/4 left-1/4 w-8 h-8 text-white/30 animate-pulse" />
        <Star className="absolute top-1/3 right-1/3 w-6 h-6 text-white/20 animate-bounce delay-200" />
        <Heart className="absolute bottom-1/3 left-1/5 w-7 h-7 text-white/25 animate-pulse delay-400" />
        <ShoppingBag className="absolute top-1/2 right-1/5 w-6 h-6 text-white/15 animate-bounce delay-600" />
      </div> */}
      <div className="relative z-10 h-full">
        <div className="grid lg:grid-cols-2 h-full">
          <div className="flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:px-16 py-8">
            <div className="text-center lg:text-left max-w-xl">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 tracking-wider">
                  {currentSlideData.category}
                </span>
              </div>
              <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {currentSlideData.title}
                </h1>
              </div>

              {/* Subtitle */}
              <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-light ${currentSlideData.accentColor} mb-6 tracking-wide`}>
                  {currentSlideData.subtitle}
                </h2>
              </div>

              {/* Description */}
              <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  {currentSlideData.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => navigate("/shop")} className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2">
                    <span>{currentSlideData.buttonText}</span>
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex justify-center lg:justify-start items-center mt-8 space-x-6 text-white/80">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-xs flex items-center">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      Đánh giá
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-xs">Khách hàng</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">#1</div>
                    <div className="text-xs">Yêu thích</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center p-8">
            <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              {/* <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold mb-2">Sản phẩm nổi bật</h3>
                  <p className="text-white/80 mb-4">Giảm giá đến 50%</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-3 bg-white rounded-full' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full'
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default FashionBanner;