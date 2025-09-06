import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandService } from '../../service/Brand.Service';

const API_IMAGE = import.meta.env.VITE_API_IMAGE;

const BrandLogos = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const animationRef = useRef();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await BrandService.getBrands();
        // Gấp đôi mảng để tạo hiệu ứng vòng lặp liên tục
        setBrands([...data, ...data]);
      } catch (error) {
        console.error('Lỗi khi tải thương hiệu:', error);
      }
    };
    fetchBrands();
  }, []);

  // Auto scroll liên tục
  useEffect(() => {
    const scrollSpeed = 0.5; // px mỗi frame (~60fps)

    const step = () => {
      if (containerRef.current) {
        scrollRef.current += scrollSpeed;
        const container = containerRef.current;

        // Reset lại scroll khi đã hết 1 nửa danh sách
        if (scrollRef.current >= container.scrollWidth / 2) {
          scrollRef.current = 0;
        }

        container.scrollLeft = scrollRef.current;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [brands]);

  const handleBrandClick = (brandId) => {
    navigate(`/shop?brandId=${brandId}`);
  };

  return (
    <div className="bg-white p-3 max-w-8xl mx-auto overflow-hidden">
      <h2 className="py-3 text-3xl font-semibold text-purple-400">Thương hiệu</h2>
      <div
        ref={containerRef}
        className="flex space-x-6 overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: 'auto' }}
      >
        {brands.map((brand, index) => (
          <div
            key={`${brand.branD_ID}-${index}`}
            onClick={() => handleBrandClick(brand.branD_ID)}
            className="flex-shrink-0 w-40 h-52 rounded-lg flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <img
              src={
                brand.branD_IMAGE
                  ? `${API_IMAGE}/${brand.branD_IMAGE}`
                  : '/placeholder-image.jpg'
              }
              alt={brand.branD_NAME}
              className="h-52 object-contain mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;
