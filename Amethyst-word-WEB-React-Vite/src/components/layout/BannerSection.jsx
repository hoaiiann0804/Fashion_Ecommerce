import { Link } from 'react-router-dom';

import bannerFashion from '../../assets/image/elle-viet-nam-trang-phuc-mau-tim-quoc-te-phu-nu-2019-3.jpg';

const BannerSection = () => {
  return (
    <section className="w-full my-12">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <img 
            className="w-full h-auto object-cover" 
            src={bannerFashion}
            alt="Công thức mix match thời thượng cho ngày giao mùa" 
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 bg-gradient-to-r from-gray-800/30 to-transparent">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">
              CÔNG THỨC MIX MATCH
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-blue-500 mb-4">
              THỜI THƯỢNG
            </h3>
            <p className="text-xl md:text-2xl text-blue-300 italic">
              cho ngày giao mùa
            </p>
            <Link to="/shop" className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition duration-300">
              Khám phá ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;