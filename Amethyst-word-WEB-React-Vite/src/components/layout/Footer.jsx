import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebookF, FaHeadset, FaInstagram, FaMapMarkerAlt, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MenuNavBarService } from '../../service/MenuNavBar.Service';
const Footer = () => {
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const contactInfo = {
        address: '  123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        email: 'hoaiiann0804@gmail.com',
        hotline: '1900 123 456',
    };
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
    const fetchMenuList = async () => {
        try {
          const data = await MenuNavBarService.getMenuList();
          if (Array.isArray(data)) {
            setMenuList(data);
          } else {
            setMenuList([]);
          }
        } catch (error) {
          setMenuList([]);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchMenuList();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    

    return (
        <footer className="bg-gradient-to-r from-[#905eb4] to-[#9966cc] text-white py-10 ">
            <div className="container mx-auto px-4">
   
                <div className="flex justify-center mb-6">
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaFacebookF /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaTwitter /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaInstagram /></a>
                    <a href="#" className="mx-2 text-white hover:text-purple-700"><FaYoutube /></a>
                </div>

                <div className="flex justify-center mb-6 space-x-6 uppercase font-medium text-sm">
                {loading ? (
              <span className="text-white">Loading...</span>
            ) : (
              menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.menU_LINK}
                  onClick={()=>document.title = `${item.menU_NAME} | AmethystWorld`}
                  className="text-white hover:text-black whitespace-nowrap px-1 transition-all duration-200 hover:scale-105"
                >
                  {item.menU_NAME}
                </Link>
              ))
            )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                  <div>
                        <h3 className="font-bold mb-4">THÔNG TIN LIÊN HỆ</h3>
                        <div className="text-white">
                        <p className="flex items-start"><FaMapMarkerAlt className=" mr-2 mt-1"/> ĐỊA CHỈ: {contactInfo.address}</p>
                            <p className="flex items-center"><FaEnvelope className="mr-2" /> EMAIL: {contactInfo.email}</p>
                            <p className="flex items-center"><FaHeadset className="mr-2" /> HOTLINE: {contactInfo.hotline}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">VỀ CHÚNG TÔI</h3>
                        <p className="text-white">
                        Chào mừng đến với AmethystWorld – Thế giới của Thời trang, Phụ kiện và Trang sức!
                        Tại đây, chúng tôi mang đến cho bạn những xu hướng thời trang mới nhất, phụ kiện tinh tế và trang sức độc đáo giúp bạn thể hiện phong cách riêng. AmethystWorld không chỉ là một cửa hàng trực tuyến, mà còn là nơi tôn vinh vẻ đẹp và cá tính của bạn.
                        </p>
                    </div>

    
                    <div>
                        <h3 className="font-bold mb-4">ĐĂNG KÝ NHẬN TIN</h3>
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            className="w-full p-2 mb-4 text-gray-900 rounded" 
                        />
                        <button className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">ĐĂNG KÝ</button>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
                        <p className="text-white">
                            Nếu cần hỗ trợ, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi. Chúng tôi luôn sẵn sàng giúp bạn giải đáp mọi thắc mắc hoặc vấn đề.
                        </p>
                    </div>
                    
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <p className="text-white">© 2025 Nhóm 1: Đồ án Reactjs + ASP.NET</p>
                    <p className="text-sm text-gray-400">GVHD: Cô Chu Thị Mai, Thành viên: Trần Xuân Hoàng, Nguyễn Hoài An </p>
                    </div>
            </div>
        </footer>
    );
};

export default Footer;
